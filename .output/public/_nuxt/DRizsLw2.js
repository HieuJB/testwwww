const n=10,a=16,T="Xem thêm",t={SM:576,MD:768,LG:1024,LGG:1076,XL:1280,XXL:1920},s={ALL:"all",HOT:"hot",LEAGUE:"league"},i={1:"Ghi bàn",2:"Góc",3:"Thẻ vàng",4:"Thẻ đỏ",5:"Việt vị",6:"Phạt trực tiếp",7:"Ghi bàn",8:"Penalty",9:"Thay người",10:"Bắt đầu",11:"Tiền vệ",12:"Kết thúc",13:"Tỷ số giữa hiệp",15:"Xác nhận nâng cấp thẻ",16:"Quả phạt đền bị bỏ lỡ",17:"Bàn thắng của riêng mình",19:"Thời gian chấn thương",21:"Sút trúng",22:"Sút không trúng",23:"Tấn công",24:"Tấn công nguy hiểm",25:"TL kiểm soát bóng",26:"Bù giờ",27:"Phạt đền",28:"VAR",29:"Phạm lỗi",30:"Phạm lỗi nguy hiểm"},o=1,h=8,M=[{id:1,name:"BET365",thesports:2,isportsapi:8},{id:2,name:"Crown",thesports:3,isportsapi:3},{id:3,name:"10BET",thesports:4,isportsapi:22},{id:4,name:"Ladbrokes",thesports:5,isportsapi:4},{id:5,name:"Mansion88",thesports:6,isportsapi:17},{id:6,name:"Macauslot",thesports:7,isportsapi:1},{id:7,name:"SNAI",thesports:8,isportsapi:7},{id:8,name:"William Hill",thesports:9,isportsapi:9},{id:9,name:"Easybets",thesports:10,isportsapi:12},{id:10,name:"Vcbet",thesports:11,isportsapi:14},{id:11,name:"Interwetten",thesports:13,isportsapi:19},{id:12,name:"12bet",thesports:14,isportsapi:24},{id:13,name:"Sbobet",thesports:15,isportsapi:31},{id:14,name:"Wewbet",thesports:16,isportsapi:35},{id:15,name:"18Bet",thesports:17,isportsapi:42},{id:16,name:"Fun88",thesports:18,isportsapi:null},{id:17,name:"188bet",thesports:21,isportsapi:23},{id:18,name:"Pinnacle",thesports:22,isportsapi:47},{id:19,name:"HK Jockey Club",thesports:null,isportsapi:48},{id:20,name:"Bwin",thesports:null,isportsapi:49}],l=[1,13,17,5,2],u={LIVESCORE:"livescore",FAVORITES:"favorites",RESULTS:"results",SCHEDULE:"schedule"},G={IS_LIVE:["2","3","4","5","6","7"],NOT_START:["1"],NOT_LIVE:["9","10","11","12","13"],IS_END:["8"]},r={MATCHES:"matches",LEAGUES:"leagues",TEAMS:"teams"},p=[{key:1,value:"1 Trận gần nhất"},{key:2,value:"2 Trận gần nhất"},{key:3,value:"3 Trận gần nhất"},{key:4,value:"4 Trận gần nhất"},{key:5,value:"5 Trận gần nhất"},{key:6,value:"6 Trận gần nhất"},{key:7,value:"7 Trận gần nhất"},{key:8,value:"8 Trận gần nhất"},{key:9,value:"9 Trận gần nhất"},{key:10,value:"10 Trận gần nhất"},{key:11,value:"11 Trận gần nhất"},{key:12,value:"12 Trận gần nhất"},{key:13,value:"13 Trận gần nhất"},{key:14,value:"14 Trận gần nhất"},{key:15,value:"15 Trận gần nhất"},{key:16,value:"16 Trận gần nhất"},{key:17,value:"17 Trận gần nhất"},{key:18,value:"18 Trận gần nhất"},{key:19,value:"19 Trận gần nhất"},{key:20,value:"20 Trận gần nhất"}],E={1:"A",2:"B",3:"C",4:"D",5:"E",6:"F",7:"G",8:"H",9:"I",10:"J",11:"K",12:"L",13:"M",14:"N",15:"O",16:"P"},e={ODDSCOMP:"oddscomp",ASIAN_HANDICAP_ODDS:"asian_handicap_odds",OVER_UNDER_ODDS:"over_under_odds",ODDS_1X2:"odds_1x2",CORNER_OU_ODDS:"corner_ou_odds",CORRECT_SCORE_ODDS:"correct_score_odds",EURO_HANDICAP_ODDS:"euro_handicap_odds",DOUBLE_CHANCE_ODDS:"double_chance_odds",STATISTICAL:"playertech"},_={DETAIL:"live",H2H:"h2h",ODDS:"odds",...e},y={SCHEDULE:"schedule",STANDING:"standing"},k={"bong da":"Trang chủ","theo doi":"Theo dõi","ket qua bong da":"Kết quả","lich thi dau":"Lịch thi đấu","tin tuc":"Tin tức","nhan dinh":"Nhận định","tin nong":"Tin nóng","tin the thao":"Tin thể thao","tin cau thu":"Tin Cầu Thủ",league:"Giải đấu",doi:"Đội",tag:"Tin tức","giai dau":"Giải đấu","dang nhap":"Đăng nhập","dang ky":"Đăng ký"},v={POST:"post",PAGE:"page"},c={FREE_PLAYER:"Free player"},d=[{key:"Tự động",value:""},{key:"GMT -11",value:"GMT-11:00"},{key:"GMT -10",value:"GMT-10:00"},{key:"GMT -9",value:"GMT-09:00"},{key:"GMT -8",value:"GMT-08:00"},{key:"GMT -7",value:"GMT-07:00"},{key:"GMT -6",value:"GMT-06:00"},{key:"GMT -5",value:"GMT-05:00"},{key:"GMT -4.5",value:"GMT-04:30"},{key:"GMT -4",value:"GMT-04:00"},{key:"GMT -3.5",value:"GMT-03:30"},{key:"GMT -3",value:"GMT-03:00"},{key:"GMT -2",value:"GMT-02:00"},{key:"GMT -1",value:"GMT-01:00"},{key:"GMT 0",value:"GMT+00:00"},{key:"GMT +1",value:"GMT+01:00"},{key:"GMT +2",value:"GMT+02:00"},{key:"GMT +3",value:"GMT+03:00"},{key:"GMT +3.5",value:"GMT+03:30"},{key:"GMT +4",value:"GMT+04:00"},{key:"GMT +5",value:"GMT+05:00"},{key:"GMT +5.5",value:"GMT+05:30"},{key:"GMT +5.75",value:"GMT+05:45"},{key:"GMT +6",value:"GMT+06:00"},{key:"GMT +6.5",value:"GMT+06:30"},{key:"GMT +7",value:"GMT+07:00"},{key:"GMT +8",value:"GMT+08:00"},{key:"GMT +9",value:"GMT+09:00"},{key:"GMT +9.5",value:"GMT+09:30"},{key:"GMT +10",value:"GMT+10:00"},{key:"GMT +10.5",value:"GMT+10:30"},{key:"GMT +11",value:"GMT+11:00"},{key:"GMT +12",value:"GMT+12:00"},{key:"GMT +13",value:"GMT+13:00"}];export{k as B,a as C,r as F,n as I,T as L,_ as M,o as O,v as P,t as S,E as T,y as W,e as a,M as b,G as c,u as d,h as e,l as f,p as g,i as h,s as i,d as j,c as k};
