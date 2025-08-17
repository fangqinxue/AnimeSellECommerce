
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";

function SellerAddProduct ({ editProductData, onClose, onSaveSuccess }) {

  const [deletedOldImages, setDeletedOldImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // const { state } = useLocation();

  // const isEdit = Boolean(state);
  const isEdit = Boolean(editProductData);

    useEffect(() => {
        const token = localStorage.getItem('sellerToken');
        if (!token) {
          navigate('/seller/login', { replace: true });
        }
      }, []);

    const seller = JSON.parse(localStorage.getItem('seller'));
    // console.log(seller.id);
  
    const [formData, setFormData] = useState({
      name: '',
      anime: '',
      character: '',
      price: '',
      stock: '',
      rating: '',
      tags: '',
      release_date: '',
      images: '',
      description: '',
      height_cm: '',
      width_cm: '',
      depth_cm: '',
      manufacturer: '',
      available: true,
    });
    
    const defaultForm = {
      name: '',
      anime: '',
      character: '',
      price: '',
      stock: '',
      rating: '',
      tags: '',
      release_date: '',
      images: '',
      description: '',
      height_cm: '',
      width_cm: '',
      depth_cm: '',
      manufacturer: '',
      available: true
    }


    useEffect(() => {
      if (isEdit ) {
        const { dimensions = {},release_date, ...rest } = editProductData;
        const formattedDate = release_date
        ? new Date(release_date).toISOString().split('T')[0]
        : '';
        setFormData({
          ...defaultForm,
          ...rest,
          release_date: formattedDate,
          height_cm: dimensions.height_cm || '',
          width_cm: dimensions.width_cm || '',
          depth_cm: dimensions.depth_cm || '',
        });
      } else {
        setFormData(defaultForm);
      }
    }, [isEdit]);




    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
      const files = e.target.files;
      const Data = new FormData();
    
      for (let i = 0; i < files.length; i++) {
        Data.append('images', files[i]);  // 注意：这里的 key 要和后端一致
      }

      // console.log(Data)
    
      setUploading(true);
      try {
        const res = await axios.post('http://localhost:3000/api/product/upload-multiple-temp', Data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
    
        const urls = res.data.imageUrls;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...urls],
        }));

      } catch (err) {
        console.error('Upload failed', err);
        alert('上传失败');
      } finally {
        setUploading(false);
      }
    };
  
    const [message, setMessage] = useState('');
  
    const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem('sellerToken');
      if (!token) {
        setMessage('please log in at first');
        return;
      }
  
      try {
        if(isEdit) {
          // 先处理图片（如果有新上传的临时图片路径）
          const res1 = await axios.post('http://localhost:3000/api/product/upload-multiple', {
            imagePaths: formData.images.map(img => {
              try {
                const url = new URL(img);
                return url.pathname;
              } catch (err) {
                return img;
              }
            })
          });

          const newImage = res1.data.finalImages;
          const tagsArray = typeof formData.tags === "string" && formData.tags.trim() !== ""
          ? formData.tags.split(",")
          : [];

          const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            rating: Number(formData.rating),
            tags: tagsArray,
            images: newImage,
            release_date: formData.release_date ? new Date(formData.release_date) : undefined,
            dimensions: {
              height_cm: Number(formData.height_cm),
              width_cm: Number(formData.width_cm),
              depth_cm: Number(formData.depth_cm),
            },
            seller: seller.id,
          };


          await axios.post(`http://localhost:3000/api/product/edit/${editProductData._id}`, payload);

                    // 删除旧图片（static）
          if (deletedOldImages.length > 0) {
            try {
              const pathsToDelete = deletedOldImages.map(img => {
                try {
                  const url = new URL(img);
                  return url.pathname;
                } catch {
                  return img;
                }
              });

              await axios.post('http://localhost:3000/api/product/delete-static-images', {
                imagePaths: pathsToDelete
              });

              setDeletedOldImages([]); // 清空记录
            } catch (err) {
              console.error('删除 static 图片失败', err);
            }
          }

          setMessage('Edit Product Successfully');
          if (onSaveSuccess) {
            onSaveSuccess();
          }

        }else{
          //改变文件从temp里面到static里面的
         const res1 =  await axios.post('http://localhost:3000/api/product/upload-multiple',{
            imagePaths: formData.images.map(img => {
              try {
                const url = new URL(img);
                return url.pathname;  // 只保留路径部分
              } catch (err) {
                return img;
              }
            })
          }, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          const newImage = res1.data.finalImages
          console.log(res1.data.finalImages
          )
          const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            rating: Number(formData.rating),
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
              // 👇 这里做处理，把图片地址去掉域名部分
            images: newImage,
            release_date: formData.release_date ? new Date(formData.release_date) : undefined,
            dimensions: {
              height_cm: Number(formData.height_cm),
              width_cm: Number(formData.width_cm),
              depth_cm: Number(formData.depth_cm),
            },
            seller: seller.id,  // 记得把sellerId也传给后台
          };





          const res = await axios.post('http://localhost:3000/api/auth/addProduct', payload);

          setMessage('Add Product Successfully');
          setFormData({
            name: '',
            anime: '',
            character: '',
            price: '',
            stock: '',
            rating: '',
            tags: '',
            release_date: '',
            images: '',
            description: '',
            height_cm: '',
            width_cm: '',
            depth_cm: '',
            manufacturer: '',
            available: true,
          });
        }

  


      } catch (error) {
        setMessage(error.response?.data?.message || error.message || 'fail to add');
      }
    };


    
      return (
        <div>
          {isEdit && <h2 style={{cursor:'pointer'}} onClick={()=>onClose()}>Back</h2>}
         <h2 style={{textAlign:'center', color:'orange',fontSize:'30px'}}>{isEdit ?  'Edit' : 'Add Product'}</h2>


          <form style={{display:'flex',flexDirection:'column',gap:'40px', alignItems:'center', margin:'50px 300px',minWidth:"200px"}} onSubmit={handleSubmit}>
    
            <input
              name="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
    
            <input
              name="anime"
              placeholder="Anime Name"
              value={formData.anime}
              onChange={handleChange}
              required
            />
    
            <input
              name="character"
              placeholder="character Name"
              value={formData.character}
              onChange={handleChange}
              required
            />
    
            <input
              name="price"
              type="number"
              placeholder="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
    
            <input
              name="stock"
              type="number"
              placeholder="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
            />
    
            <input
              name="rating"
              type="number"
              placeholder="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
    
            <input
              name="tags"
              placeholder="tags（逗号分隔）"
              value={formData.tags}
              onChange={handleChange}
            />
    
            <input
              name="release_date"
              type="date"
              placeholder="release date"
              value={formData.release_date}
              onChange={handleChange}
            />

            <div style={{    display: "grid",
            gridTemplateColumns:"repeat(auto-fill, 120px)",gap: "16px",
            width:'100%'}}>

    
                {formData.images && formData.images.map((url, idx) => (
                  <div 
                  style={{
                    position:'relative',
                  }}
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  >                  
                    <img style={{height:"120px",width:'120px',borderRadius:'10px',objectFit: "cover"}} 
                       src={url} alt={`product-${idx}`} width="100" />

                    {hoveredIndex === idx && (<button 
                        onClick={async() => {

                          const imageToDelete = formData.images[idx];
                          setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }));

                          if(!isEdit){

                            try {
                              // 这里假设你的后端删除接口是 DELETE /api/product/delete-temp-image
                              // 并且需要图片路径（可能是 url 或路径名，注意后端如何识别）
                              
                              // 从 URL 中提取路径部分，比如 http://localhost:3000/temp/abc.jpg -> /temp/abc.jpg
                              let imagePath = imageToDelete;
                              try {
                                const urlObj = new URL(imageToDelete);
                                imagePath = urlObj.pathname; 
                              } catch {
                                // 如果不是完整URL就用原字符串
                              }
                        
                              await axios.delete('http://localhost:3000/api/product/delete-temp-image', {
                                data: { imagePath }
                              });
                        
                            } catch (err) {
                              console.error('删除服务器临时图片失败', err);
                              alert('删除服务器临时图片失败');
                            }
                          

                          }else{
                            if (imageToDelete.includes('temp/')){
                              try {
                                let imagePath = imageToDelete;
                                try {
                                  const urlObj = new URL(imageToDelete);
                                  imagePath = urlObj.pathname; 
                                } catch {
                                  // 如果不是完整URL就用原字符串
                                }
                          
                                await axios.delete('http://localhost:3000/api/product/delete-temp-image', {
                                  data: { imagePath }
                                });
                          
                              } catch (err) {
                                console.error('删除服务器临时图片失败', err);
                                alert('删除服务器临时图片失败');
                              }

                            }else{
                              setDeletedOldImages(prev => [...prev, imageToDelete]);

                            }

                          }

                        }
                      }
                      style={{
                        position:'absolute',
                        top:'-10px',
                        right:'-10px',
                        background: "rgba(255, 0, 0, 0.7)",
                        border: "none",
                        borderRadius: "10px",
                        width: "120px",
                        height: "120px",
                        color: "white",
                        cursor:'pointer'
                      }}
                      type="button"><AiOutlineDelete size={30}></AiOutlineDelete></button>)}

                  </div>
                ))}


            
              <label style={{
                width:'120px',
                height:'120px',
                border:'2px dashed #ccc',
                borderRadius:'10px',
                display:'flex',
                cursor:'pointer',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#f9f9f9',
                fontSize:'40px'
              }}>
                +


                <input
                  type="file"
                  multiple
                  style={{display:'none'}}
                  onChange={handleImageUpload}
                />

              </label>



            </div>


{/*     
            <input
              name="images"
              placeholder="图片链接（逗号分隔）"
              value={formData.images}
              onChange={handleChange}
            /> */}
    
            <textarea
              name="description"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
            />
    
            <input
              name="height_cm"
              type="number"
              placeholder="height (cm)"
              value={formData.height_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="width_cm"
              type="number"
              placeholder="width (cm)"
              value={formData.width_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="depth_cm"
              type="number"
              placeholder="depth (cm)"
              value={formData.depth_cm}
              onChange={handleChange}
              min="0"
              step="0.1"
            />
    
            <input
              name="manufacturer"
              placeholder="manufacture"
              value={formData.manufacturer}
              onChange={handleChange}
            />
    
            <label style={{display:'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '16px',
                          color: '#333',
                          cursor: 'pointer',
                          userSelect: 'none'
            }}>
              <input
                name="available"
                type="checkbox"
                checked={formData.available}
                onChange={handleChange}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'coral',  
                  cursor: 'pointer',
                }}
              /> on stock
            </label>
    
            <button type="submit">{isEdit ? 'Save Change' : 'Submit'}</button>
          </form>
    
          {message && <p>{message}</p>}



        </div>
      );


}

export default SellerAddProduct