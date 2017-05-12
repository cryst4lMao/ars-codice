// const api = require('./index.js');

const test = (data) => {
    if (data && data.code && data.code == 200) {
        console.log('request success')
    } else {
        console.error('request invalid!')
        return false
    }
}

api.search('你好吗').then(test)
api.play(28377211).then(test)
api.playlist(311785002).then(test)
api.getArtistAlbums('9952').then(test)
api.getAlbum(32311).then(test)