//玩家角色的等级
module.exports = {
    partnerId : ["0001","0002","0003","0004","0005","0006","0007","0008","0009","0010","0011","0012"],
    createPartner:function(actorId){
        var originData = this[actorId];
        var actor = {};
        for(var p in originData){
            actor[p] = originData[p];
        }
        return actor;
    },
    "0001":{
                name  : "name1",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3100,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 51,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 1,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0002":{
                name  : "name2",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3020,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 60,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 2,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0003":{
                name  : "name3",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 2000,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 70,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 3,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0004":{
                name  : "name4",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 4000,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 35,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 4,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0005":{
                name  : "name5",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 4000,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 35,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 5,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0006":{
                name  : "name6",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 4200,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 53,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 6,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0007":{
                name  : "name7",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 4200,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 53,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 7,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0008":{
                name  : "name8",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3800,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 62,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 8,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0009":{
                name  : "name9",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3500,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 56,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 9,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0010":{
                name  : "name10",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3500,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 80,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 10,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0011":{
                name  : "name11",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3500,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 80,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 11,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    "0012":{
                name  : "name12",
                rank  : 4,       //星级
                level : 53,      //等级
                attr  : 1,     //属性
                exp   : 32000,   //经验值
                hp    : 3500,    //血量
                mp    : 300,     //魔法值
                ep    : 0,       //技能值
                atk   : 80,      //物理攻击力
                def   : 10,      //物理防御力
                matk  : 40,      //魔攻
                mdef  : 40,      //魔防
                spd   : 12,       //速度
                talent: [        //天赋，每个角色独一无二
                            {id:"t1", name:"t1"}
                        ],
                skill : [        //战斗技能，每个角色自带（固定），也可以在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"sk1", name:"sk1", exp:3000, level:5, attr:1, consume:30}
                        ],
                magic : [        //魔法，每个角色自带（固定），也可在爬楼中临时学习（等级为学习时的最高技能等级，仅战斗有效）
                            {id:"mag1", name:"mag1", exp:2000, level:6, attr:1, consume:30}
                        ],
                equip : {
                            head:"",        //头
                            neck:"",        //颈
                            body:"",        //身
                            arm:"",         //臂
                            hand:"",        //手
                            finger:"",      //指
                            sash:"",        //腰
                            leg:"",         //腿
                            foot:""         //脚
                        }
           },
    data : null
};
