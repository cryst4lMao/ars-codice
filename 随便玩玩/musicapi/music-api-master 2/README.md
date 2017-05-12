# music-api
网易云音乐api接口

## Start

``` shell
yarn add music-api-netease or npm install music-api-netease
```

## Usage

``` javascript
const api = require("music-api-netease")
api
    .search('Unity')
    .then(res=>console.log(res))
```

## API

### search 搜索歌曲
``` javascript
api
    .search('Unity')
    .then(res=>console.log(res))
```

### play 歌曲详情
``` javascript
api
    .play(28377211)
    .then(res=>console.log(res))
```

### playlist 播放列表
``` javascript
api
    .playlist(311785002)
    .then(res=>console.log(res))
```

### getArtistAlbums 获取歌手专辑列表
``` javascript
api
    .getArtistAlbums(9952)
    .then(res=>console.log(res))
```

### getAlbum 获取专辑音乐列表
``` javascript
api
    .getAlbum(32311)
    .then(res=>console.log(res))
```
