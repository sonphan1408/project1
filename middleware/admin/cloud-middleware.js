const cloudinary = require('cloudinary').v2;
const multer  = require('multer');
const streamifier = require('streamifier');
const upload = multer();
cloudinary.config({ 
    cloud_name: 'dxynrhlrk', 
    api_key: '319775619834628', 
    api_secret: 'g82g-SBmAJByRz1v-urGMfECbE8' 
});


module.exports.uploadClound = (req,res,next) =>{
  
        if (req.file) {
            // 1. Tạo hàm upload trả về Promise
            let streamUpload = (req) => {
              return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(error);
                  }
                });
          
                // Biến buffer thành stream và đẩy lên Cloudinary
                streamifier.createReadStream(req.file.buffer).pipe(stream);
              });
            };
          
            // 2. Hàm thực thi chính
            async function upload(req) {
              try {
                let result = await streamUpload(req);
                // Lưu link ảnh vào body để dùng cho bước tiếp theo (Lưu DB)
                req.body[req.file.fieldname] = result.secure_url;
                next(); // Chuyển sang middleware kế tiếp
                // console.log(req.file);
              } catch (error) {
                console.error("Lỗi upload:", error);
                res.status(500).send("Upload thất bại");
              }
            }
          
            upload(req);
          } else {
            next(); // Nếu không có file thì bỏ qua
          }
    }

