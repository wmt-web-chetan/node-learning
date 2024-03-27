const asyncHandler = (requestHandler)=>{
    (req,resp,next)=>{
    Promise.resolve(
        
    ).catch((err)=>next(err));
    }
}

export { asyncHandler}