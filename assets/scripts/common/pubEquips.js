//玩家角色的等级
module.exports = {
    "baseurl": "resources/equip/",
    "0001":{
                name  : "0001",
                profession:1,  //适用职业
                type  : 1,       //装备类型。如剑、刀、枪
                wear  : 1,       //穿戴部位，
                attr  : 1,     //属性,只有武器才有属性，防具没有属性
                hp    : 3000,    //+血量
                mp    : 300,     //+魔法值
                atk   : 50,      //+物理攻击力
                def   : 10,      //+物理防御力
                matk  : 40,      //+魔攻
                mdef  : 40,      //+魔防
                spd   : 7        //+速度
           },
    genEquip : function(){},
    data : null
};
