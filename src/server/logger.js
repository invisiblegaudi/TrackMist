module.exports = {
    debug : (msg) => {
	if(process.env.debug === 'true') console.log(msg)
    }
}
