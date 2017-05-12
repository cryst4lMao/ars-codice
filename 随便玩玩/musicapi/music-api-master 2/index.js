// const rp = require('request-promise')

const baseUrl = 'http://music.163.com'

const request = (options) => {
    Object.assign(options, {
        headers: {
            Referer: baseUrl
        },
        json: true
    })
    // return rp(options)
}

const api = new class {

    /**
     * 搜索
     * @param   {string}    s       搜索关键字
     * @param   {json}      params  其他参数
     * @returns {object}
     */
    search(s = null, {limit = 10, type = 1, offset = 0} = {}) {
        const uri = `${baseUrl}/api/search/get/`
        const options = {
            method: 'POST',
            uri,
            form: { s, limit, type, offset }
        }
        return request(options)
    }

    /**
     * 播放列表
     * @param   {string}    id      列表id
     * @returns {object}
     */
    playlist(id = null) {
        const uri = `${baseUrl}/api/playlist/detail?id=${id}`
        const options = { uri }
        return request(options)
    }

    /**
     * 歌曲详情
     * @param   {string}    id      歌曲id
     * @returns {object}
     */
    play(id = null) {
        const uri = `${baseUrl}/api/song/detail`
        const options = {
            uri,
            qs: { id, ids: `[${id}]` }
        }
        return request(options)
    }

    /**
     * 获取歌手专辑列表
     * @param   {string}    artistId 歌手id
     * @returns {object}
     */
    getArtistAlbums(artistId = null, {limit = 10, offset = 0} = {}) {
        const uri = `${baseUrl}/api/artist/albums/${artistId}`
        const options = {
            uri,
            qs: { limit, offset }
        }
        return request(options)
    }

    /**
     * 获取专辑音乐列表
     * @param   {string}    alibumId 专辑id
     * @returns {object}
     */
    getAlbum(albumId = null) {
        const uri = `${baseUrl}/api/album/${albumId}`
        const options = { uri }
        return request(options)
    }

}()

// module.exports = api