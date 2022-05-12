/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */

const checkRol = (roles) =>(req, res,  next)=>{

    try{
        const {usuario} = req
  
         const rolesByUser = usuario.rol;

         const checkValueRol = roles.some((rolSingle)=> rolesByUser.includes(rolSingle))
         if(!checkValueRol){
     
            return res.status(403).json({
                msg: 'Sin permiso '//- usuario no existe DB
            })
         }
        next()
    }catch (error) {
        console.log(error);
        res.status(403).json({
            msg:'Sin permiso'
        })
    }   

    

    
}
export default checkRol