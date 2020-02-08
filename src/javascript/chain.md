## 链式调用

```js
class Man {
    constructor(name){
        this.name = name
        this.quque = Promise.resolve()
        this.init()
    }
    init(){
        console.log(this.name)
        return this
    }
    sleep(t){
        this.quque = this.quque.then(() => {
            return new Promise(res => {
                setTimeout(() => res(), t*1000)
            })
        })
        return this
    }
    sleepFirst(t){
        this.isGap = true
        this.timegap = t
        return this
    }
    say(req){
        if(this.isGap){
            this.sleep(this.timegap)
        }
        this.quque = this.quque.then(() => {
            console.log(req)
        })
        return this
    }
    eat(req){
        this.quque = this.quque.then(() => {
            console.log(req)
        })
        return this
    }
}
new Man('a').sleep(10).eat('b').sleep(5).eat('c')
new Man('v').sleepFirst(5).say('aaaaa').say('bbbbb')
```

