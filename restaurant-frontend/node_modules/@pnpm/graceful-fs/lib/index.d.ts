import gfs from 'graceful-fs';
declare const _default: {
    copyFile: typeof gfs.copyFile.__promisify__;
    copyFileSync: typeof gfs.copyFileSync;
    createReadStream: typeof gfs.createReadStream;
    link: typeof gfs.link.__promisify__;
    linkSync: typeof gfs.linkSync;
    readFile: typeof gfs.readFile.__promisify__;
    readFileSync: typeof gfs.readFileSync;
    readdirSync: typeof gfs.readdirSync;
    stat: typeof gfs.stat.__promisify__;
    statSync: gfs.StatSyncFn;
    unlinkSync: typeof gfs.unlinkSync;
    writeFile: typeof gfs.writeFile.__promisify__;
    writeFileSync: typeof gfs.writeFileSync;
};
export default _default;
