//粒子渲染动画
export class CanvasAnimate  {
      constructor(Dom, options){
          options = options || {}
          this.Element = Dom//背景canvas
          this.cvs = Dom.getContext("2d")
          this.off_cvs = document.createElement("canvas")//绘制随机点的面板
          this.off_cvs.width = Dom.width//粒子canvas宽
          this.off_cvs.height = Dom.height//粒子canvas高
          this.Dom = this.off_cvs.getContext("2d")
          this.width = Dom.width//dom width
          this.height = Dom.height//dom height
          this.length = options.length || 200//粒子数
          this.RoundColor = options.RoundColor || "#999"//粒子颜色
          this.RoundDiameter = options.RoundDiameter || 2//圆的直径
          this.LineColor = options.LineColor || "#ccc"//线的背景
          this.LineWeight = options.LineWeight || 1//线粗
          this.clicked = options.clicked || false//添加click事件
          this.moveon = options.moveon || false//移上面板特效
          this.list = []//粒子数组
          this.paused = true//暂停
      }
      //运行主方法
      Run(){
        //添加点击事件（点击处添加地址）
        if( this.clicked ){
          this.Element.addEventListener( "click",this.Clicked.bind(this) )
        }
        //moveon事件
        if( this.moveon ){
          this.Element.addEventListener( "mousemove",this.moveXY.bind(this) )
          this.Element.addEventListener( "mouseout",this.moveoutXY.bind(this) )
        }
        //绘制方法（传入随机生成的粒子数组）
        this.Draw( this.getLength() )
      }
      //生成随机粒子数组
      getLength(){
      let arr = []//存放随机生成的点的数组
      for(let i=0;i< this.length ;i++){
        let obj = {}
            obj.x = parseInt( Math.random() * this.width )//生成坐标
            obj.y = parseInt( Math.random() * this.height )
            obj.r = parseInt( Math.random()*10 ) || 1//半径
            obj.controlX = parseInt( Math.random()*10 ) > 5 ? "left":"right"
            obj.controlY = parseInt( Math.random()*10 ) > 5 ? "bottom":"top"
            arr.push(obj)
      }
      return arr
    }
    //绘制
    Draw(list){
      let new_arr = []
      let line_arr = []

      list.map((item,index)=>{
        let xy = this.ControlXY(item)
        let obj = this.ControlRound(xy)
        new_arr.push( obj )
      });
      //计算圆与圆中间的线的坐标
      new_arr.map((item1,index1)=>{
        new_arr.map((item2,index2)=>{
            if(item1 !== item2){
                let x = item1.x - item2.x
                let y = item1.y - item2.y
                if( Math.abs(x)< 100 && Math.abs(y)<100 ){
                    let obj = {
                        x1:item1.x,
                        y1:item1.y,
                        x2:item2.x,
                        y2:item2.y,
                    }
                    line_arr.push(obj)
                }
            }
        })
      })
      //绘制线
      this.drawLine(line_arr)
      //绘制粒子
      new_arr.map((item)=>{
        this.drawRound(item)
      })

      this.list = new_arr
      //把粒子放到dom上
      this.cvs.drawImage(this.off_cvs,0,0,this.width,this.height)
      //循环播放(其实是肉眼重影)
      setTimeout(()=>{
        if(this.paused){
            this.next()
        }
      },50)
    }
    //重新绘制
    next(){
      this.cvs.clearRect( 0,0,this.width,this.height )
      this.Dom.clearRect( 0,0,this.width,this.height )
      this.Draw( this.list )
    }
    //画圆
    drawRound(obj){
      let {x,y,r} = obj
      this.Dom.beginPath()
      this.Dom.arc( x,y,r, 0, 2*Math.PI )
      this.Dom.fillStyle = this.RoundColor
      this.Dom.fill()
      this.Dom.closePath()
    }
    //划线
    drawLine(list){
      list.map( (item)=>{
        this.Dom.beginPath()
        this.Dom.moveTo( item.x1,item.y1 )
        this.Dom.lineTo( item.x2,item.y2 )
        this.Dom.lineWidth = this.LineWeight
        this.Dom.strokeStyle = this.LineColor
        this.Dom.stroke()
        this.Dom.closePath()
      })
    }
    //控制偏移坐标
    ControlXY(obj){
      if(obj.x >= (this.width - obj.r) ){
        obj.controlX = 'left'
      }else if( obj.x <= parseInt(obj.r/2)  ){
        obj.controlX = "right"
      }

      if( obj.y >= (this.height - obj.r) ){
        obj.controlY = "bottom"
      }else if( obj.y <= parseInt(obj.r/2) ){
        obj.controlY = "top"
      }
      return obj
    }
    //控制圆偏移
    ControlRound(obj){
      switch(obj.controlX){
        case "right":
            obj.x++;
            break;
        case "left":
            obj.x--;
            break;
      }
      switch(obj.controlY){
        case "top":
            obj.y++;
            break;
        case "bottom":
            obj.y--;
            break;
      }
      return obj
    }
    //添加点击事件在下一帧在点击处绘制出一个新的粒子
    Clicked(event){
      let obj = {}
        obj.x = event.clientX
        obj.y = event.clientY
        obj.r = parseInt( Math.random()*10 )
        obj.controlX = parseInt( Math.random()*10 ) > 5 ? 'left' :'right'
        obj.controlY = parseInt( Math.random()*10 ) > 5 ? 'bottom' :'top'
      this.list.push(obj)
    }
    //在下一帧绘制一个偏移量
    moveXY(event){
      let obj = {}
        obj.x = event.clientX
        obj.y = event.clientY
        obj.r = 0
        obj.move = true
      if( this.list[0]["move"] ){
        this.list[0]["x"] = obj.x
        this.list[0]["y"] = obj.y
        this.list[0]["r"] = 1
      }else{
        this.list.unshift(obj)
      }
    }
    //移除粒子数组中的第一个粒子
    moveoutXY(event){
      this.list.shift()
    }
  //暂停用  
  pause(){
      this.paused = !this.paused
      if( this.paused){
        this.Draw(this.list)
      }
    }

}
