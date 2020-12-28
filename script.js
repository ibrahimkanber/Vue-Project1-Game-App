new Vue({
    el:"#app",
    data:{
        player_health:100,
        monster_health:100,
        isStarted:false,
        logs:[],
        logtext:{
            attack:"Player Attack",
            specialAttack:"Player Special Attack",
            healUp:"Time to Heal Up",
            giveUp:"Give Up...",
            monsterAttack:"Monster Attack"
        },
        healUpCount:3,
        specialAttackCount:3

    },
    methods:{
        newGame:function(){
            this.isStarted=true
        },
        attack:function(){
            var point=Math.ceil(Math.random()*10)
            this.monster_health-=point
            this.add_to_log({turn:"p",text:`${this.logtext.attack} ${point} point`})
            this.monsterAttack()


        },
        specialAttack:function(){
            var point=Math.ceil(Math.random()*20)
            this.specialAttackCount-=1
            this.monster_health-=point
            this.add_to_log({turn:"p",text:`${this.logtext.specialAttack} ${point} point`})
            this.monsterAttack()
        },
        healUp:function(){
            var point=Math.ceil(Math.random()*15)
            this.healUpCount-=1
            if(this.healUpCount>=0){
                this.player_health+=point
                this.add_to_log({turn:"p",text:`${this.logtext.healUp}  ${point} point`})
            }
        },
        giveUp:function(){
            this.player_health=0
            this.add_to_log({turn:"p",text:`${this.logtext.giveUp}`})
            
        },
        monsterAttack:function(){
            var point=Math.ceil(Math.random()*10)
            this.player_health-=point
            this.add_to_log({turn:"m",text:`${this.logtext.monsterAttack} ${point} point`})
        },
        add_to_log:function(log){
            this.logs.push(log)
        }
    },
    watch:{
        player_health:function(val){
       
            if(val>100){
                this.player_health=100

            }
            if(val<=0){
                this.player_health=0

                if(confirm("Game is over..You are loser😌..Play Again? ")){
                    this.player_health=100;
                    this.monster_health=100;
                    this.healUpCount=3,
                    this.specialAttackCount=3,
                    this.logs=[]
                   

                }
            }
        },
        monster_health:function(val){
            if(val<0){
                this.monster_health=0
                if(confirm("Game is over..You are winner  😎  😎 ..Play Again? ")){
                    this.healUpCount=3,
                    this.player_health=100;
                    this.monster_health=100;
                    this.specialAttackCount=3,
                    this.logs=[]
                }
            }
        },

    },
    computed:{
        playerProgress:function(){
            return{
                width:this.player_health+'%'
            }
        },
        monsterProgress:function(){
            return{
                width:this.monster_health+'%'
            }
        }
    }

})