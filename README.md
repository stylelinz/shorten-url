# Shorten URL generator

由 mongoDB 與 nodeJS 開發的短網址產生器  [DEMO](https://glacial-cove-09436.herokuapp.com)

![demo](demo.png)

## 功能
* 複製一個網址
* 按下`copy`一件複製產生下來的網址

## 環境建置與需求 (prerequisites)
 * [Node.js](https://nodejs.org/en/): v15.11.0
 * [MongoDB](https://www.mongodb.com/try/download/community): v4.2.13

## 專案啟動方式
  1. 下載專案壓縮檔或使用git clone至個人電腦
  ```bash
    git clone https://github.com/stylelinz/shorten-url.git
  ```
  2. 進入專案資料夾，在終端機輸入以下指令
  ```bash
    cd shorten-url
  ```
  3. 安裝npm套件，在終端機輸入以下指令
  ```bash
    npm install
    npm i nodemon
  ```

  4. 在終端機輸入以下指令新增種子資料
  ```bash
    npm run seed
  ```

  5. 啟動伺服器，執行 app.js 檔案，輸入以下指令
  ```bash
    npm run dev
  ```

  6. 當終端機出現以下字樣，表示伺服器與資料庫已啟動並成功連結，可以在瀏覽器觀看 http://localhost:3000
  ```bash
    Express is listening on http://localhost:3000
    mongodb connected!
  ```

  7. 在終端機按下 `ctrl` + `c` 或 `cmd` + `c`，以關閉伺服器