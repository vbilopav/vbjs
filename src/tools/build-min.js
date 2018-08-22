const uglifyEs = require("uglify-es");
const fs = require("fs");
const path = require("path");
const cleanPath = name => name.replace(/[\\/]/g, path.sep)

const 
    walkSync = function (dir, pathnames, filelist) {
        var 
            fs = fs || require('fs'),
            files = fs.readdirSync(dir);
        var
            filelist = filelist || [];
        if (pathnames) {
            pathnames = (pathnames instanceof Array ? pathnames : [pathnames]);
        }
        files.forEach(function (file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = walkSync(path.join(dir, file) + path.sep, pathnames, filelist);
            }
            else {
                if (!pathnames || !pathnames.length || pathnames.indexOf(path.extname(file)) !== -1) {
                    filelist.push({ file: file, dir: dir, full: path.join(dir, file) });
                }
            }
        });
        return filelist;
    },
    rmdirSync = pathName => {
        var 
            fs = fs || require('fs');
        if (fs.existsSync(pathName)) {
            fs.readdirSync(pathName).forEach(function (file, index) {
                var curPath = pathName + path.sep + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    rmdirSync(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(pathName);
        }
    },
    mkDirByPathSync = targetDir => {
        const
            isRelativeToScript = false,
            sep = path.sep,
            initDir = path.isAbsolute(targetDir) ? sep : '',
            baseDir = isRelativeToScript ? __dirname : '.';
    
        targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
            if (!fs.existsSync(curDir)) {
                console.log(`>>> Creating new dir ${curDir}`);
                fs.mkdirSync(curDir);
            }
            return curDir;
        }, initDir);
    };


const 
    sourceDir = cleanPath("../vbjs/dev/"),
    targetDir = cleanPath("../vbjs/min/");


console.log(`>>> Removing target dir ${targetDir}`);
rmdirSync(targetDir);

const
    fileListObjects = walkSync(sourceDir);

for (let item of fileListObjects) {
    let dirName = cleanPath(item.dir).replace(sourceDir, targetDir),
        fileName = cleanPath(item.full).replace(sourceDir, targetDir);

    mkDirByPathSync(dirName);
    console.log(`>>> Minifying ${item.full} ...`);
    let content = uglifyEs.minify(fs.readFileSync(item.full).toString(), null);

    console.log(`>>> Writting ${fileName} ...`);
    fs.writeFileSync(fileName, content.code, "utf8");
}
