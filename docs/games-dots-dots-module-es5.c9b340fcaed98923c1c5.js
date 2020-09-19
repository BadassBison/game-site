!function(){function t(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}function s(t,s){for(var e=0;e<s.length;e++){var a=s[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function e(t,e,a){return e&&s(t.prototype,e),a&&s(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{qFff:function(s,a,i){"use strict";i.r(a),i.d(a,"DotsModule",(function(){return D}));var n,o,h,r=i("PCNd"),c=i("iInd"),l=function(){function s(e){t(this,s),this.state=e}return e(s,[{key:"addConnection",value:function(t,s){switch(t.toLocaleLowerCase()){case"north":this.state.connections.north=s;break;case"east":this.state.connections.east=s;break;case"south":this.state.connections.south=s;break;case"west":this.state.connections.west=s}}}],[{key:"dotBuilder",value:function(t,e,a,i){return new s({id:"".concat(a).concat(i),x:t,y:e,column:a,row:i,radius:8,connections:{north:null,east:null,south:null,west:null}})}}]),s}(),u=function(){function s(e){t(this,s),this.state=e}return e(s,[{key:"handleClick",value:function(t){this.state.startingDot?this.endingMove(t):this.startingMove(t)}},{key:"startingMove",value:function(t){this.calculateDotClicked(t)&&this.getAvailableNeighbors()}},{key:"endingMove",value:function(t){var s=this.calculateDotClicked(t),e=this.state.totalSquaresLeft;s&&(this.makeConnections(),e===this.state.totalSquaresLeft&&this.changePlayer()),this.state.startingDot=null,this.state.endingDot=null}},{key:"changePlayer",value:function(){this.state.currentPlayer=this.state.players[(this.state.currentPlayer.state.id+1)%2]}},{key:"calculateDotClicked",value:function(t){var s,e,a,i,n,o,h,r,c,l=t.clientX,u=t.clientY;u-=40;var d=Math.floor(l/(this.state.width/this.state.columns)),v=Math.floor(u/(this.state.height/this.state.rows)),g=this.state.dots.get("".concat(d).concat(v));if(this.state.startingDot&&(null===(e=null===(s=this.state.currentNeighbors)||void 0===s?void 0:s.north)||void 0===e?void 0:e.state.id)!==g.state.id&&(null===(i=null===(a=this.state.currentNeighbors)||void 0===a?void 0:a.east)||void 0===i?void 0:i.state.id)!==g.state.id&&(null===(o=null===(n=this.state.currentNeighbors)||void 0===n?void 0:n.south)||void 0===o?void 0:o.state.id)!==g.state.id&&(null===(r=null===(h=this.state.currentNeighbors)||void 0===h?void 0:h.west)||void 0===r?void 0:r.state.id)!==g.state.id)return!1;var y=u-g.state.y,f=l-g.state.x;return Math.sqrt(y*y+f*f)<Math.floor(1.5*g.state.radius)?null!==this.state.startingDot&&(null===(c=this.state.startingDot)||void 0===c?void 0:c.state.id)!==g.state.id?(this.state.endingDot=g,!0):!this.state.startingDot&&(this.state.startingDot=g,!0):(this.state.startingDot=null,!1)}},{key:"getAvailableNeighbors",value:function(){var t,s,e,a,i=this.state.startingDot.state,n=i.column,o=i.row,h=this.state.startingDot.state.connections;!h.north&&o>0&&(t=this.state.dots.get("".concat(n).concat(o-1))),!h.east&&n<this.state.columns-1&&(s=this.state.dots.get("".concat(n+1).concat(o))),!h.south&&o<this.state.rows-1&&(e=this.state.dots.get("".concat(n).concat(o+1))),!h.west&&n>0&&(a=this.state.dots.get("".concat(n-1).concat(o))),this.state.currentNeighbors={north:t,east:s,south:e,west:a}}},{key:"makeConnections",value:function(){var t,s,e,a,i,n,o,h,r,c=this.state.currentNeighbors;(null===(t=c.north)||void 0===t?void 0:t.state.id)===(null===(s=this.state.endingDot)||void 0===s?void 0:s.state.id)&&(r="north",this.state.startingDot.addConnection("north",this.state.endingDot),this.state.endingDot.addConnection("south",this.state.startingDot)),(null===(e=c.east)||void 0===e?void 0:e.state.id)===(null===(a=this.state.endingDot)||void 0===a?void 0:a.state.id)&&(r="east",this.state.startingDot.addConnection("east",this.state.endingDot),this.state.endingDot.addConnection("west",this.state.startingDot)),(null===(i=c.south)||void 0===i?void 0:i.state.id)===(null===(n=this.state.endingDot)||void 0===n?void 0:n.state.id)&&(r="south",this.state.startingDot.addConnection("south",this.state.endingDot),this.state.endingDot.addConnection("north",this.state.startingDot)),(null===(o=c.west)||void 0===o?void 0:o.state.id)===(null===(h=this.state.endingDot)||void 0===h?void 0:h.state.id)&&(r="west",this.state.startingDot.addConnection("west",this.state.endingDot),this.state.endingDot.addConnection("east",this.state.startingDot)),this.detectFullSquare(r)}},{key:"detectFullSquare",value:function(t){"north"===t||"south"===t?(this.checkLeftSquare(t),this.checkRightSquare(t)):"west"!==t&&"east"!==t||(this.checkTopSquare(t),this.checkBottomSquare(t))}},{key:"checkLeftSquare",value:function(t){var s,e;(null===(s=this.state.startingDot)||void 0===s?void 0:s.state.connections.west)&&(null===(e=this.state.endingDot)||void 0===e?void 0:e.state.connections.west)&&this.state.startingDot.state.connections.west.state.connections[t]&&("north"===t?0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.endingDot.state.connections.west):this.state.players[1].state.squares.push(this.state.endingDot.state.connections.west):0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.startingDot.state.connections.west):this.state.players[1].state.squares.push(this.state.startingDot.state.connections.west),this.state.totalSquaresLeft--)}},{key:"checkRightSquare",value:function(t){var s,e;(null===(s=this.state.startingDot)||void 0===s?void 0:s.state.connections.east)&&(null===(e=this.state.endingDot)||void 0===e?void 0:e.state.connections.east)&&this.state.startingDot.state.connections.east.state.connections[t]&&("north"===t?0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.endingDot):this.state.players[1].state.squares.push(this.state.endingDot):0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.startingDot):this.state.players[1].state.squares.push(this.state.startingDot),this.state.totalSquaresLeft--)}},{key:"checkTopSquare",value:function(t){var s,e;(null===(s=this.state.startingDot)||void 0===s?void 0:s.state.connections.north)&&(null===(e=this.state.endingDot)||void 0===e?void 0:e.state.connections.north)&&this.state.startingDot.state.connections.north.state.connections[t]&&("west"===t?0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.endingDot.state.connections.north):this.state.players[1].state.squares.push(this.state.endingDot.state.connections.north):0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.startingDot.state.connections.north):this.state.players[1].state.squares.push(this.state.startingDot.state.connections.north),this.state.totalSquaresLeft--)}},{key:"checkBottomSquare",value:function(t){var s,e;(null===(s=this.state.startingDot)||void 0===s?void 0:s.state.connections.south)&&(null===(e=this.state.endingDot)||void 0===e?void 0:e.state.connections.south)&&this.state.startingDot.state.connections.south.state.connections[t]&&("west"===t?0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.endingDot):this.state.players[1].state.squares.push(this.state.endingDot):0===this.state.currentPlayer.state.id?this.state.players[0].state.squares.push(this.state.startingDot):this.state.players[1].state.squares.push(this.state.startingDot),this.state.totalSquaresLeft--)}}],[{key:"boardBuilder",value:function(t,e,a,i,n){for(var o=i/t,h=a/e,r=o/2,c=h/2,u=new Map,d=0;d<t;d++)for(var v=0;v<e;v++){var g=l.dotBuilder(v*h+c,d*o+r,v,d);u.set("".concat(v).concat(d),g)}return new s({dots:u,rows:t,columns:e,width:a,height:i,rowSpacing:o,columnSpacing:h,topPadding:r,sidePadding:c,totalSquaresLeft:(t-1)*(e-1),players:n,currentPlayer:n[0],startingDot:null,endingDot:null,currentNeighbors:null})}}]),s}(),d=function(){function s(e){t(this,s),this.state=e}return e(s,null,[{key:"playerBuilder",value:function(t,e,a){return new s({id:t-1,name:a||"Player "+t,color:e,squares:[]})}}]),s}(),v=i("8Y7J"),g=["dots"],y=[{path:"",component:(n=function(){function s(){t(this,s),this.rows=8,this.columns=8,this.highlightRadius=16}return e(s,[{key:"ngAfterViewInit",value:function(){this.ctx=this.canvas.nativeElement.getContext("2d"),this.setCanvasDimensions(),this.board=u.boardBuilder(this.rows,this.columns,this.canvas.nativeElement.width,this.canvas.nativeElement.height,this.buildPlayers()),this.draw()}},{key:"setCanvasDimensions",value:function(){this.canvas.nativeElement.width=innerWidth,this.canvas.nativeElement.height=innerHeight-40}},{key:"buildPlayers",value:function(){return[d.playerBuilder(1,"blue"),d.playerBuilder(2,"red")]}},{key:"handleClick",value:function(t){this.board.handleClick(t),this.board.state.startingDot?(this.highlightClickedDot(),this.highlightNeighbors()):this.draw()}},{key:"clearCanvas",value:function(){this.ctx.clearRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height)}},{key:"drawPlayerBorder",value:function(){this.ctx.strokeStyle=this.board.state.currentPlayer.state.color,this.ctx.lineWidth=30,this.ctx.strokeRect(0,0,this.canvas.nativeElement.width,this.canvas.nativeElement.height)}},{key:"draw",value:function(){this.clearCanvas(),this.drawPlayerBorder(),this.drawDots(this.board.state.dots),this.fillSquares()}},{key:"drawDots",value:function(t){var s=this;t.forEach((function(t){s.drawDot(t,!1),s.drawConnections(t)}))}},{key:"drawDot",value:function(t,s){this.ctx.fillStyle=s?"pink":"black",this.ctx.beginPath(),this.ctx.arc(t.state.x,t.state.y,t.state.radius,0,2*Math.PI,!0),this.ctx.fill()}},{key:"drawConnections",value:function(t){var s=t.state.connections,e=s.north,a=s.east,i=s.south,n=s.west;this.ctx.strokeStyle="black",this.ctx.lineWidth=6,this.ctx.beginPath(),this.ctx.moveTo(t.state.x,t.state.y),e&&(this.ctx.lineTo(e.state.x,e.state.y),this.ctx.moveTo(t.state.x,t.state.y)),a&&(this.ctx.lineTo(a.state.x,a.state.y),this.ctx.moveTo(t.state.x,t.state.y)),i&&(this.ctx.lineTo(i.state.x,i.state.y),this.ctx.moveTo(t.state.x,t.state.y)),n&&this.ctx.lineTo(n.state.x,n.state.y),this.ctx.stroke()}},{key:"fillSquare",value:function(t,s){this.ctx.fillStyle=this.board.state.players[s].state.color,this.ctx.fillRect(t.state.x,t.state.y,this.board.state.columnSpacing,this.board.state.rowSpacing)}},{key:"fillSquares",value:function(){var t=this;this.board.state.players[0].state.squares.forEach((function(s){t.fillSquare(s,0)})),this.board.state.players[1].state.squares.forEach((function(s){t.fillSquare(s,1)}))}},{key:"highlightClickedDot",value:function(){this.drawDot(this.board.state.startingDot,!0)}},{key:"highlightNeighbors",value:function(){var t=this.board.state.currentNeighbors,s=t.north,e=t.east,a=t.south,i=t.west;this.ctx.strokeStyle="goldenrod",this.ctx.lineWidth=4,this.ctx.beginPath(),s&&this.ctx.arc(s.state.x,s.state.y,this.highlightRadius,0,2*Math.PI,!0),e&&(this.ctx.moveTo(e.state.x+this.highlightRadius,e.state.y),this.ctx.arc(e.state.x,e.state.y,this.highlightRadius,0,2*Math.PI,!0)),a&&(this.ctx.moveTo(a.state.x+this.highlightRadius,a.state.y),this.ctx.arc(a.state.x,a.state.y,this.highlightRadius,0,2*Math.PI,!0)),i&&(this.ctx.moveTo(i.state.x+this.highlightRadius,i.state.y),this.ctx.arc(i.state.x,i.state.y,this.highlightRadius,0,2*Math.PI,!0)),this.ctx.stroke()}}]),s}(),n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=v.Fb({type:n,selectors:[["app-dots"]],viewQuery:function(t,s){var e;1&t&&v.gc(g,!0),2&t&&v.bc(e=v.Wb())&&(s.canvas=e.first)},decls:2,vars:0,consts:[[1,"canvas",3,"click"],["dots",""]],template:function(t,s){1&t&&(v.Ob(0,"canvas",0,1),v.Vb("click",(function(t){return s.handleClick(t)})),v.Nb())},styles:[""]}),n)}],f=((h=function s(){t(this,s)}).\u0275mod=v.Jb({type:h}),h.\u0275inj=v.Ib({factory:function(t){return new(t||h)},imports:[[c.b.forChild(y)],c.b]}),h),D=((o=function s(){t(this,s)}).\u0275mod=v.Jb({type:o}),o.\u0275inj=v.Ib({factory:function(t){return new(t||o)},imports:[[r.a,f]]}),o)}}])}();
//# sourceMappingURL=games-dots-dots-module-es5.c9b340fcaed98923c1c5.js.map