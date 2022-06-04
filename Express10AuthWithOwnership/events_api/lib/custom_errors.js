class DocumentNotFoundError extends Error {
    constructor(){
        super()
        this.name = 'DocumentNotFoundError'
        this.message = 'The requested document was not found'
    }
}
class BadParamsError extends Error {
    constructor(){
        super()
        this.name = 'BadParamsError'
        this.message = 'A required parameter was omitted or invalid'
    }
}
class BadCredentialsError extends Error {
    constructor(){
        super()
        this.name = 'BadCredentialsError'
        this.message = 'The Email or Password is invalid'
    }
}
// this error will occur whenever someone doesnt own a resource
class OwnershipError extends Error{
    constructor(){
        super()
        this.name = 'OwnershipError'
        this.message = 'The provided token does not match the owner of the document'
    }
}

const handle404 = function(doc){
    // if the doc does'nt exist cause a DocumentNotFoundError
    if(doc === null){
        //cause a DocumentNotFoundError
        throw new DocumentNotFoundError()
    }
    // else return doc
    return doc

}
// we need the request because its going to have the user on it 
// we will also need teh document because it will have the owner on it 
const requireOwnership = function(req, doc){
    // if teh document has been populated use the id on that owner object 
    // if it hasnt been populated so we can just use the owner
    // when we populate we will get back a whole obj not just the id, check gundamdb if still confused 
    const owner = doc.owner._id ? doc.owner._id : doc.owner
    // if the signed in users id(req.user._id) is not the owner
    // of the document (doc.owner) 
    // in mongoose we need to use the .equals method not the ===
if(!req.user._id.equals(owner)){
    // throw an ownership error 
    throw new OwnershipError()
}
return doc
}

module.exports = {
    DocumentNotFoundError, //we dont need this one because its only being used in handle404 and we are exporting that but i did it just incase 
    BadParamsError, 
    BadCredentialsError,
    handle404,
    OwnershipError,
    requireOwnership
}