const handleHttpErros = (res, message = 'Something went wrong', codeError = 403 ) => {
    res.status(codeError);
    res.send({error:message});
}

module.exports = {handleHttpErros};