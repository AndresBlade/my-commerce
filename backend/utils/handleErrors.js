const handleHttpErros = (res, message = 'Something went wrong', codeError = 403) => {
    if(res.headerSent){
        return;
    }
    res.status(codeError).json({ error: message });
}

module.exports = {handleHttpErros};
