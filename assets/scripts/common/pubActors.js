//玩家角色的等级
module.exports = {
    actorId : ["0001","0002","0003","0005","0006","0008","0009","0010"],
    "0001":{
                name  : "0001",
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
    "0002":{
                name  : "0002",
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
    "0003":{
                name  : "0003",
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
    "0005":{
                name  : "0005",
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
                name  : "0006",
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
    "0008":{
                name  : "0008",
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
                name  : "0009",
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
                name  : "0010",
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
    data : null
};
