'use strict';

module.exports = live_surround;
module.exports = block_seat;
module.exports =
module.exports =
module.exports =
module.exports =
module.exports =
module.exports =
module.exports =
module.exports =

// ブロックを敷き詰めるループ
function block_seat(containerWidth,containerHeight,blockWidth,blockHeight){
    for (let y = 0; y < containerHeight; y += blockHeight) {
      for (let x = 0; x < containerWidth; x += blockWidth) {
        // ブロック要素を作成
        const block = document.createElement('div');
        block.classList.add("block");

        // ブロックの位置を設定
        block.style.left = x + 'px';
        block.style.top = y + 'px';

        // コンテナにブロックを追加
        container.appendChild(block);
      }
    }
    return 
}



function live_surround(livelist,WidthblockNum){

    let num =WidthblockNum;
    let surround =[];

    for (let i = 0; i<livelist.length; i++){
    //現在生きてるマス（livelist）
    let livnum = livelist[i];
    //左上
    let lefup = livnum - (num + 1);
    //中央上
    let cenup = livnum - num;
    //右上
    let rigup = livnum - (num - 1);
    //左隣
    let lefs  = livnum - 1;
    //右隣
    let rigs  = livnum + 1;
    //左下
    let lefd  = livnum + (num -1);
    //中央下
    let cend  = livnum + (num);
    //右下
    let rigd  = livnum + (num + 1);

    surround.push(lefup,cenup,rigup,lefs,livnum,rigs,lefd,cend,rigd);
  }

  return surround;

}

