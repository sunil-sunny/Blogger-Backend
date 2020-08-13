const auth=(req,res,next)=>{
    console.log('Middleware Started')
    //Middle ware code for blogs
    next()
}


module.exports=auth