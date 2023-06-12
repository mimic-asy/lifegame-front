'use strict';

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
}


// ブロック要素にクリックイベントリスナーを追加,色を替える。
function change_color(livelist,blocks){
  for(let i = 0; i < blocks.length; i++){
    blocks[i].addEventListener("click",function(){
    const clickindex = i;
    console.log("Clickd block index", clickindex);
    const selectblock = blocks[clickindex];
    //ブロックの背景色の変更を行う
      if(selectblock.style.backgroundColor === "red"){
        selectblock.style.backgroundColor="white";
        let clear = livelist.indexOf(clickindex);
        livelist.splice(clear,1);
        }
        else{
        selectblock.style.backgroundColor="red";
        livelist.push(clickindex);
        }
      });
    }
}


//盤面をリセットする。
function allclear(blocks,livelist){
  for(let i = 0; i<blocks.length; i++){
    if(blocks[i].style.backgroundColor === "red"){
      blocks[i].style.backgroundColor ="white";
      livelist.length = 0;
    }
  }
}

//周囲に生きているマスの数を数える
function counter(n,livelist,WidthblockNum){
    let count = 0;
    let num =WidthblockNum;
    let livnum = n;
    //周囲のマスのインデックスを特定する
    //左上
    const lefup = livnum - (num + 1);
    //中央上
    const cenup = livnum - num;
    //右上
    const rigup = livnum - (num - 1);
    //左隣
    const lefs  = livnum - 1;
    //右隣
    const rigs  = livnum + 1;
    //左下
    const lefd  = livnum + (num -1);
    //中央下
    const cend  = livnum + (num);
    //右下
    const rigd  = livnum + (num + 1);

    const sround = [lefup,cenup,rigup,lefs,rigs,lefd,cend,rigd];

    //周囲のマスが何個livelistに含まれているか確認する
    for(let i = 0; i < livelist.length; i++){
      for(let k = 0; k < sround.length; k++){
        if(livelist[i] === sround[k]){
          count++;
        }
      }
    }
    console.log(count);
    return count;
  }


//白い背景の時、カウントが３なら、背景を赤にする
function liveordie(n, count, livelist,blocks) {

    if (rorw(n,blocks)) {
      if (count <= 1 || count >= 4) {
        blocks[n].style.backgroundColor = "white";
      }
    }
    else{
      if (count === 3) {
        blocks[n].style.backgroundColor = "red";

      }
    }
}


//リストから指定の要素を消す
function listdelete(n,list){
    let clear = list.indexOf(n);
    list.splice(clear,1);
}



//赤ならtrue 白ならfalse を返す
function rorw(n,blocks){
  if(blocks[n].style.backgroundColor === "red"){
    return true;
  }
  else{
    return false;
  }

}


//周囲１マスを範囲外とする
function space_delete(livelist,WidthblockNum,blocks){
  const livelistlength = livelist.length;
    for (let i = livelistlength-1; i>=0; i--){
      if(livelist[i] <= WidthblockNum || livelist[i] > 11990 ||
        livelist[i]%WidthblockNum === 0 || livelist[i]%WidthblockNum === 108){
        let changeblock = blocks[livelist[i]]
        changeblock.style.backgroundColor="white";
        livelist.splice(i,1);
        }
    }
}

//livelistと周囲８マスを探索するためのリストを作る
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

//盤面のうちの赤い部分をlistに入れる（全探索）
function nextlivelist(WidthblockNum,blocks){
    let newlivelist = [];
    for(let i = WidthblockNum; i <blocks.length; i++){
        if(rorw(i,blocks)){
            newlivelist.push(i);
        }
    }
    return newlivelist;
}

//一つ先の盤面にする
function onegeneration(livelist,WidthblockNum,blocks){
//現在のlivelistを表示
  console.log(livelist);
//範囲外にある　インデックスをを削除
  space_delete(livelist,WidthblockNum,blocks);
//livelistと周囲８マスを探索するためのリスト
  let sarchlist =live_surround(livelist,WidthblockNum);
//livelistと周囲８マスを探索
  for(let i = 0; i<sarchlist.length; i++){
    changeboard(i,sarchlist,livelist,WidthblockNum,blocks);
  }
}

function lifegame(livelist, WidthblockNum, blocks) {
      onegeneration(livelist, WidthblockNum, blocks);
      livelist = nextlivelist(WidthblockNum,blocks);
      console.log(livelist);
  }


//盤面を替える
function changeboard(i,sarchlist,livelist,WidthblockNum,blocks){
        let sarchnum = sarchlist[i];
        let cnt = counter(sarchnum,livelist,WidthblockNum);
        liveordie(sarchnum,cnt,livelist,blocks);
}


// コンテナの幅と高さ
const containerWidth = 1100;
const containerHeight = 600;

// ブロックのサイズ
const blockWidth = 10;
const blockHeight = 10;

//ブロックの数
const WidthblockNum = 109;

// コンテナ要素を取得
const container = document.querySelector('.container');

// ブロック要素の配列を取得
const blocks = document.getElementsByClassName('block');

//生きているblockのリスト
const livelist = [];

block_seat(containerWidth,containerWidth,blockWidth,blockHeight);
change_color(livelist,blocks);

//ボタンたち　上がlifegameを始めるボタン　下がresetするボタン
document.getElementById("start").onclick = function(){lifegame(livelist,WidthblockNum,blocks)};
document.getElementById("reset").onclick = function(){allclear(blocks,livelist)};
document.getElementById("choice").onclick = function(){counter(2881,livelist,WidthblockNum)};








