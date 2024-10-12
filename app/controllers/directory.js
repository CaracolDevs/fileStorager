const fs = require('fs')
const {promisify} = require('util')
const readdir = promisify(fs.readdir)
const multer = require('multer')
const path = require('node:path'); 
const admZip = require('adm-zip');

exports.folders = async (folder) => {
    try {
        const files = await readdir(`./uploads${folder}`);
        return files;
    } catch (error) {
        throw error
    }
}


exports.routing = async (folders, router) => {
    let results = await folders('/')
    console.log("results", results)
    results.forEach(result => {
        return router.get(`/${result}`, async function(req, res) {
            let content = await folders(`/${result}`)
            console.log("psot results", content, result)
            res.render('folders',{result,content});
          })
    })
}

exports.create = (req, res) => {
    const name = req.body.name
    try {
        fs.mkdir(`uploads/${name}`, (err) => {
            if(err) throw Error(err.message)
        })
    console.log('directory', name, 'created!')
    res.redirect(req.get('referer'));
    } catch (error) {
        res.send({ message: 'not Done!' })
        throw error
    }
}

exports.delete = (req, res) => {
    const emptyDir = async ({empty}) => {
        const name = req.body.name
        try {
            fs.rm(`uploads/${name}`, {recursive: empty}, (err) => {
                if(err) throw Error(err)
            })
        console.log('deleted!')
        res.redirect(req.get('referer'));
        } catch (err) {
            throw err
        }
    }

    emptyDir({empty:true})
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

exports.storage = (req, res, next) => {
    let name = req.body.name
    console.log("name", req)
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads${name}`)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    next()
}

const upload = multer({ storage: storage })

exports.upload = upload.array('files')

exports.uploadNone = upload.none()

exports.uploadFile = (req, res, next) => {
    /*res.redirect(req.get('referer'));*/
    next()
}

exports.moveFile = (req, res) => {

    req.files.forEach(element => {
        let oldPath = `uploads/${element.filename}`
        let newPath = `uploads/${req.body.name}/${element.filename}`
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
        })
    });
    res.redirect(req.get('referer'));
}

exports.downloadFilee = (req, res) => {
    let newPath = path.join(__dirname, '../../')
    console.log(newPath)
    const file = `${newPath}uploads\\test`;
    console.log(file)
    res.download(file); // Set disposition and send it.
}



exports.downloadFile = async (req, res) => {
    let zip = new admZip();
    let name = req.body.name
    // add local file
    console.log(req.body)
    const files = await readdir(`./uploads/${name}`);
    const filess = await readdir("./")
    console.log("filesss",filess)
    console.log("files:", files)
    files.forEach((element) => {
        zip.addLocalFile(`./uploads/${name}/${element}`);
        console.log("zip files:", files)
    })
    // get everything as a buffer
    const zipFileContents = zip.toBuffer();
    console.log("zipcontents",zipFileContents)
    const fileName = 'uploads.zip';
    const fileType = 'application/zip';
    res.setHeader('Content-Type', 'application/zip').send(zipFileContents)
      console.log("filename;",fileName)
};

/*
exports.upload = (req, res) => {

    const name = req.body.name

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads`)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    
    let upload = multer({ storage: storage })
    
    upload.array('files', 10)
    
    uploadFile = () => {
        res.end()
    }
    
    uploadFile()

}

*/


exports.check = (req, res) => {
    try {
        const checkFiles = async (directory = `./uploads`) => {
            const files = await readdir(directory);
            return files;
        }
        checkFiles().then((content) => {
            res.send({ message: content })
        })
    } catch (error) {
        res.send({ message: 'not Done!' })
        throw error
    }
}

exports.checkIndex = (req, res) => {
    try {
        const checkFiles = async (directory = `./uploads`) => {
            const files = await readdir(directory);
            let stats = []

            files.forEach( (file) => {
                let stat = fs.statSync(`./uploads/${file}`)
                //stats.push(stat)
                //console.log("aaaa",stat)
                let date = new Date(stat.birthtimeMs).toString(); // create Date object
                stats.push(date.slice('0','15'))
                console.log("cum",date)
            })
            console.log(files,stats)


            let total = [files,stats]
            
 

            return total 
        }
        checkFiles().then((content) => {
            res.render('index', {content})
        })
    } catch (error) {
        res.send({ message: 'not Done!' })
        throw error
    }
}