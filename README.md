# MusicList

# 概要
音楽リストを入力、管理、グラフ化する簡単なWebアプリです。
Vue初心者がchatGPTに頼りながら作成したことをご理解いただけると幸いです。

## インストール方法
```
git clone https://github.com/harumaki2000/MusicList.git

cd MusicList

npm install 

npm run build

npm install -g serve

npm install firebase

nohup serve -s dist &
```
http://localhost:3000 にアクセスします。

## プロセスを停止する方法
```
ps aux | grep 'serve -s dist'
kill <PID>
```
