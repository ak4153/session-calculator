class Session {
    constructor(sessionId, price, month,uniqueId,xPos,yPos) {
        this.sessionId = sessionId
        this.price = price
        this.month = month
        this.uniqueId = uniqueId
        this.yPos = yPos 
        this.xPos = xPos 
    }
    sety(y){
        this.yPos = y
    }
    
}
