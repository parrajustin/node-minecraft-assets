import { Presets, MultiBar } from 'cli-progress';
import { readdirSync, Dirent, stat, createReadStream, createWriteStream } from 'fs';
import { $ } from 'zx';

function ProcessDirectory(dirents: Dirent[], filter: RegExp, path: string, filesToCopy: string[]) {
  for (const dirent of dirents) {
    if (dirent.name.match(filter)) {
      continue;
    }

    if (dirent.isFile()) {
      filesToCopy.push(`${path}/${dirent.name}`);
    } else if (dirent.isDirectory()) {
      const newPath = `${path}/${dirent.name}`;
      const output = readdirSync(newPath, { withFileTypes: true });
      ProcessDirectory(output, filter, newPath, filesToCopy);
    }
  }
}

void (async function () {
  await $`bazel build :next_minecraft_assets`;

  // Read top level directory.
  const root = './dist/bin/out';
  const output = readdirSync(root, { withFileTypes: true });

  const filesToCopy: string[] = [];
  ProcessDirectory(output, /minecraft-assets/, root, filesToCopy);

  // create new container
  const multibar = new MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true
    },
    Presets.shades_grey
  );

  // const progressBars = new Map<string, SingleBar>();
  const overallProgress = multibar.create(filesToCopy.length, 0);
  overallProgress.update(0, { files: `0/${filesToCopy.length}` });
  let copyIndex = 0;
  let completedFiles = 0;
  let workingJobs = 0;
  let resolveFunc: () => void = () => {
    return;
  };
  const pipeline = new Promise<void>((resolve) => {
    resolveFunc = resolve;
  });

  const setupWorker: () => void = () => {
    overallProgress.update(completedFiles, { files: `${completedFiles}/${filesToCopy.length}` });
    if (copyIndex >= filesToCopy.length) {
      if (workingJobs === 0) {
        resolveFunc();
      }
      return;
    }

    const progressBar = multibar.create(100, 0);
    workingJobs++;
    const file = filesToCopy[copyIndex];
    const destFile = file.substr(root.length + 1);
    // console.log(destFile);
    copyIndex++;
    progressBar.update(0, { filename: destFile });

    stat(file, (err, stats) => {
      if (err) {
        workingJobs--;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupWorker();
        multibar.remove(progressBar);
        completedFiles++;
        return;
      }

      const filesize = stats.size;
      let bytesCopied = 0;

      const readStream = createReadStream(file);
      readStream.on('data', (buffer) => {
        bytesCopied += buffer.length;
        const percentage = (bytesCopied / filesize) * 100;
        progressBar.update(percentage, { filename: file });
      });
      readStream.on('end', () => {
        progressBar.update(100, { filename: file });
        workingJobs--;
        completedFiles++;
        setupWorker();
      });
      readStream.pipe(createWriteStream(destFile));
    });
  };

  setupWorker();
  setupWorker();

  await pipeline;

  // stop all bars
  multibar.stop();
})();
