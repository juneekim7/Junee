const anime=["Q","O","Z","X","W","S","A","D","N","M"];
/*
    Q==시계방향 180도 회전
    O==반시계방향 180도 회전
    Z==시계방향 20도 회전
    X==반시계방향 20도 회전
    W==위로
    S==아래로
    A==왼쪽으로
    D==오른쪽로
    N==시계방향 23도 회전 (smooth)
    M==반시계방향 23도 회전 (smooth)
*/

const def="#FEC3B9";

const level = [
    {
        Name: "babyshark",
        Difficulty: 0,
        Music: 493134474,
        BPM: 1050,
        Enter: 1,
        EnterColor: def,
        Notes: "12345678",
        Anime: "12345678",
    },
    {
        Name: "lemon",
        Difficulty: 1,
        Music: 459060531,
        BPM: 1377,
        Enter: 1,
        EnterColor: def,
        Notes: "  qwerpoiu12340987  qwerpoiu12340987qwerpoiu12340987qwerpoiu l e m o n",
        Anime: "  qwerpoiu12340987  qwerpoiu12340987qwerpoiu12340987qwerpoiu l e m o n",
    },
    {
        Name: "Colorless",
        Difficulty: 2,
        Music: 264299383,
        BPM: 993,
        Enter: 1,
        EnterColor: "#2B2D3E",
        Notes: " color-less              1234567809876543abcdefghijklmnop",
        Anime: " color-less              1234567809876543abcdefghijklmnop",
    },
    {
        Name: "WORDS",
        Difficulty: 3,
        Music: 153545045,
        BPM: 495,
        Enter: 1,
        EnterColor: "#D9ADAD",
        Notes: "w o r d smsmsmsm1 2 3 4 5 6 7 8 w o r d smsmsmsm1 2 3 4 5 6 7 8 g r e a t j o b 1234567887654321smsmsmsmmsmsmsmsw o r d woskxmdjrufhvbg ↵↵↵↵wordsmsm↵↵↵↵w o r d s ",
        Anime: "w o r d AmDmAmDm1 2 3 4 D A D A w o r d AmDmAmDm1 2 3 4 D A D A g r e a t j o b 1234567887654321smsmsmsmmsmsmsmsw o r d woskxmdjrufhvbg ↵↵↵↵wordsmsm↵↵↵↵w o r d s ",
    },
    {
        Name: "miss u",
        Difficulty: 5,
        Music: 302520493,
        BPM: 748,
        Enter: 2,
        EnterColor: "#273751",
        Notes: "m i s s y o u , h a t e y o u . ↵qwerpoiuasdflkjhqetupiyradgjljgdqwerpoiuasdflkjhqetupiyradgjljgd↵g o o d b y e . w t f . ",
        Anime: "m i s s y o u , h a t e y o u . ↵NwerMoiuNsdfMkjhAetuDiyrAdgjDjgdNwerMoiuNsdfMkjhWetuSiyrWdgjSjgd↵g o o d b y e . w t f . ",
    },
    {
        Name: "MINE",
        Difficulty: 6,
        Music: 208626021,
        BPM: 483,
        Enter: 1,
        EnterColor: def,
        Notes: "ezpzezpzezpzqwerpoiuasdflkjhzxcvmnbvtyg1234567890987654321234567890-=qwerlkjhzxcvpoiuqwerlkjhzxcvpoiuasdfmnbvasdfiuytasdfmnbv",
        Anime: "ezpzezpzezpzqwerpoiuasdflkjhzxcvmnbvtyg1234567890987654321234567890-=qwerlkjhzxcvpoiuqwerlkjhzxcvpoiuasdfmnbvasdfiuytasdfmnbv",
    },
    {
        Name: "MILABO",
        Difficulty: 7,
        Music: 857080987,
        BPM: 431,
        Enter: 1,
        EnterColor: "#95D7D3",
        Notes: "m n mnm m n mnm zxzxzxzxzxzxzzzm1qaz-pl,2wsx0okm1qaz-pl,2wsx0   uzzzjzzzizzzozzzuzzzjzzzizzzozzzuxzxjxzxixzxoxzxzxzxzxzxzxzxz   m   i   l   a   b   o   zx  1qaz-pl,2wsx0okm1qaz-pl,2wsx0okm",
        Anime: "m n mnm m n mnm zxzxzxzxzxzxzzzM1qaz-pl,2wsx0okm1qaz-pl,2wsx0   QzzzOzzzizzzozzzQzzzOzzzizzzozzzuxzxjxzxixzxoxzxzxzxzxzxzxzxz   m   i   l   a   b   o   zx  1qaz-pl,2wsx0okm1qaz-pl,2wsx0okm",
    },
    {
        Name: "Awsome",
        Difficulty: 8,
        Music: 781357153,
        BPM: 670,
        Enter: 2,
        EnterColor: "#655B9D",
        Notes: " ↵↵      aslkdfjhaslkdfjhaslkdfjhaslkdfjhaslkdfjh↵aplwsokedijrfuhqaplwsokedijrfuh↵ ↵↵a w s o m e aslkdfjhaslkdfjh↵aplwsokedijrfuhqaplwsokedijrfuhaqlpswkodejifrhuqaplwsokedijrfuh↵",
        Anime: " ↵↵      aslkdfjhaslkdfjhaslkdfjhaslkdfjhaslkdfjh↵aplwsokedijrfuhqaplwsokedijrfuh↵ ↵↵a w s o m e aslkdfjhaslkdfjh↵aplwsokedijrfuhqaplwsokedijrfuhaqlpswkodejifrhuqaplwsokedijrfuh↵",
    },
    {
        Name: "Energy Drink",
        Difficulty: 8,
        Music: 247400088,
        BPM: 466.5,
        Enter: 2,
        EnterColor: "#ADEDED",
        Notes: " 12345678qwertyuiasdfghjkzxcvbnm,,mnbvcxzlkjhgfdspoiuytre-0987654↵        e n e r         g y d r         i n k           qwerpoiu ↵ qpwoeialskdjz,xmcnvbfhruty g↵qweasdzxc       zaqwsxcde       qweasdzxc       qazwedsxc       ewqazxcds       qesx            energy      energy     ↵ene↵gy",
        Anime: " W2S4A6D8WwSrAyDiWsSfAhDkWxSvAnD,WmSbAcDzWkShAfDsWoSuAtDe-0987654Q        e n e r         g y d r         i n k           qwerpoiu Q qpwoeialskdjz,xmcnvbfhruty g↵qweasdzxc       zaqwsxcde       qweasdzxc       qazwedsxc       ewqazxcds       qesx            energy      energy     QeneQgy",
    },
    {
        Name: "G.C. Tokyo",
        Difficulty: 9,
        Music: 757097956,  //764248810 - soundcloud 에서 삭제됨
        BPM: 484,
        Enter: 2,
        EnterColor: "#FD6079",
        Notes: "    alalalalalalalalalalalalalalgggg    g h o s t   c i t y  t o k y o      alalalal    c l a v i s     gggggggg1z-,qwerpoiuqazpl,woqwerpoiuqazpl,wo↵';las↵qwerpoiuqzecp,in↵ t o k y o . ↵1234567890-=qwerpoiuqzecp,inqwerpoiuqzecp,in",
        Anime: "    alalalalalalalalalalalalalalgggg    g h o s t   c i t y  t o k y o      alalalal    c l a v i s     gggggggg1z-,qwerpoiuqazpl,woqwerpoiuqazpl,wo↵';las↵NwerMoiuNzecM,in↵ t o k y o . ↵1234567890-=qwerpoiuqzecp,inqwerpoiuqzecp,in",
    },
    {
        Name: "C.Night Plan",
        Difficulty: 11,
        Music: 811966285,
        BPM: 502,
        Enter: 2,
        EnterColor: "#482B85",
        Notes: "  cynicalnightplan↵awsplokedrfijuhaqswlpkodefrjihuqawsplokedrfijuhqwerpoiuadgjl↵qzecp,inqzecp,inqzecp,inqzecp,inqwerpoiuasdflkjhqwerpoiuasdflkjh↵       qawsplokedrfijuhqawsplokedrfijuhqawsplokedrfijuhqwerpoiuadgjl↵↵qawsplokedrfijuhaqswlpkodefrjihuqawsplokedrfijuhaqswlpkodefrjihu",
        Anime: "  AyniDalnWghtSlanZawsplokedrfijuhaqswlpkodefrjihuqawsplokedrfijuhqwerpoiuadgjl↵qzecp,inqzecp,inqzecp,inqzecp,inqwerpoiuasdflkjhqwerpoiuasdflkjh↵       qawsplokedrfijuhqawsplokedrfijuhqawsplokedrfijuhqwerpoiuadgjl↵↵qawsplokedrfijuhaqswlpkodefrjihuqawsplokedrfijuhaqswlpkodefrjihu",
    },
    {
        Name: "Karma",
        Difficulty: 13,
        Music: 804545398,
        BPM: 455,
        Enter: 2,
        EnterColor: "#AB0A15",
        Notes: " ↵  qwerpoiuasdflkjhrewquiopfdsahjklqwerpoiuasdflkjhrewquiopfdsahjkl↵ k a r m a 1029/ y u m l a 0192qzqzp,p,ececininqzqzp,p,ececininqazspl,kedcfijnhqazspl,kedcfg  ↵ qwerpoiuasdflkjhrewquiopfdsahjklqwerpoiuasdflkjhrewquiopfdsahjklasdflkjhqwerpoiufdsahjklrewquiopqwerpoiuasdflkjhrewquiopfdsahjkl↵",
        Anime: " Q  qwerpoiuasdflkjhrewquiopfdsahjklqwerpoiuasdflkjhrewquiopfdsahjkl↵ k a r m a N029/ y u m l a M192qzqzp,p,ececininqzqzp,p,ececininqazspl,kedcfijnhqazspl,kedcfg  Q qwerpoiuasdflkjhrewquiopfdsahjklqwerpoiuasdflkjhrewquiopfdsahjklasdflkjhqwerpoiufdsahjklrewquiopqwerpoiuasdflkjhrewquiopfdsahjkl↵",
    },
    {
        Name: "Rock N.K.O.D",
        Difficulty: 13,
        Music: 730761973,
        BPM: 453.5/2,
        Enter: 1,
        EnterColor: "#ED7479",
        Notes: "   ↵~~     ↵~~     ↵~r~ock =~=~p~p~k~k~n~n~=~=~p~p~k~k~u~u~=~=~p~p~k~k~n~n~zxcvaw3e~~4r    =~=~p~p~k~k~n~n~b~b~k~k~p~p~-~= zxcvasdfzcxvfsdao~~~xeacqzds    =~=~p~p~k~k~n~n~b~b~c~c~z~z~-~= vcxzfdsavxczadsfo~~~qxevzwcrz~s~e~~~~~~~↵ ↵ ↵   ",
        Anime: "   Z~~     X~~     S~S~Mck =~=~p~p~k~k~n~n~=~=~p~p~k~k~u~u~=~=~p~p~k~k~n~n~Oxcvaw3e~~4r    S~=~S~p~S~k~S~n~W~b~A~k~D~p~-~M Oxcvasdfzcxvfsdao~~~xeacqzds    S~=~S~p~S~k~S~n~W~b~A~c~D~z~-~N Qcxzfdsavxczadsfo~~~qxevzwcrz~s~e~~~~~~~Z Z Z   ",
    },
    {
        Name: "KAIBUTSU",
        Difficulty: 15,
        Music: 964119325,
        BPM: 330,
        Enter: 2,
        EnterColor: "#5A1717",
        Notes: "    a~kaibutsuustubiakmonster~retsnom~1pa,zlq-2osmxkw0monster~retsnom~whatcan~iii~do~~s~t~r~ong~e~r~  ↵aibutsuustubiak1pa,zlq-2osmxkw0m~o~n~s~t~e~r~~~i~w~u~2~ smi~le~~kaibutsukai~mon~mon~str~on~ger k~a~i~b~u~t~s~u~kaibutsuustubiak1pa,zlq-2osmxkw0monster~strong↵kaibutsuustubiakmonster~retsnom~1pa,zlq-2osmxkw0monster~retsnom~",
        Anime: "    a~QaibutsuQstubiakQonster~retsnom~OWaWzWqWOWsWxWwWOWnWtWrWrWtWnWmWXhatcan~Xii~do~~M~M~N~MNM~N~N~  QaibutsuAstubiakSpa,zlq-Wosmxkw0D~o~M~s~A~e~r~~~D~w~u~2~AsmD~le~~kaibutsukWi~mWn~mWn~sWr~on~ger W~a~i~b~S~t~s~u~OaibutsuDstubiakSpa,zlq-Wosmxkw0Aonster~Dtrong↵MaibutsuMstuMiakNonsMer~Netsnom~Mpa,zlq-MosmMkw0NonsMer~NetsMom~",
    },
    {
        Name: "FloweR",
        Difficulty: 16,
        Music: 855498841,
        BPM: 354,
        Enter: 2,
        EnterColor: "FDDF96",
        Notes: "    12 wsxokmdjwsxmkojdwsxokmdjwsxmko  qwsdcvpowqdsvcpoijiji   zsedc~  b~jo~~~~b~8o~~~~z~x~c   okmju~~↵  zwxecrvtbynumi,p~~~k~~~n~~~     qxwcevrbtnymu,io~~~j~~~b~~~     zwxecrvtbynumi,p~~~k~~~n~~~     qxwcevrbtnymu,io~~~j~~~b~~~    wsxokmdj        okmwsxjd        wsxokmdj        f l o w e~r ",
        Anime: "    12 WsxWkmdjWsxWkojdWsxWkmdjWsxmko  qwsdcvpOwqdsvcpQOjOjO   Zsedc~  A~jo~~~~D~8o~~~~Q~x~c   okmju~~↵  Zwxecrvtbynumi,p~~~k~~~n~~~     Xxwcevrbtnymu,io~~~j~~~b~~~     Zwxecrvtbynumi,p~~~k~~~n~~~     Xxwcevrbtnymu,io~~~j~~~b~~~    Qsxokmdj        Okmwsxjd        Qsxokmdj        W A D S O~r ",
    },
    {
        Name: "habby",
        Difficulty: 17,
        Music: 242922523,
        BPM: 428,
        Enter: 2,
        EnterColor: "#2F3136",
        Notes: "1234qwerasdfzxcvbnm,hjkluiop890-qpdkz.6ygb7ygb5tgb6tgbpqowieurytlaksjdhfgz.x,cmvnbghtyuio567890↵rupzvm/purq/mvzqrupzvm/purq/mv↵↵rupzvm/purq/mvzqrupzvm/purq/mv↵↵rupzvm/purq/mvzqrupzvm/purq/mv↵↵rupzvm/purq/mvzqrupzvm/purq/mv↵",
        Anime: "1234qwerasdfzxcvbnm,hjkluiop890-qpdkz.6ygb7ygb5tgb6tgbpqowieurytlaksjdhfgz.x,cmvnbghtyuio567890↵rupzvm/purq/mvzqrupzvm/purq/mv↵↵rupzvm/purq/mvzqrupzvm/purq/mv↵↵rupzvm/purq/mvzqrupzvm/purq/mv↵↵rupzvm/purq/mvzqrupzvm/purq/mv↵",
    },
    {
        Name: "KING",
        Difficulty: 17,
        Music: 898743994,
        BPM: 361,
        Enter: 2,
        EnterColor: "#B32226",
        Notes: " youking↵ k~ijnuhbygvft~g~k~njibhuvgvgv~  k~ijnuhbygvft~g~k~njibhu↵↵~↵ kgggkgggkgggkgggkgggigggnggggyui↵g↵↵g↵↵y↵↵~y  g↵↵g↵↵king~↵↵g↵↵g↵↵y↵↵~y  g↵↵g  g n k i k~ijnbhu↵↵~↵ kgggkgggkgggkgggkgggigggnggggyui↵dsaasd↵↵ijnbhu↵~~~njij↵dsaasd↵↵ijnbhu↵~~~↵   u~r k~ijnuhbggggu~r k~ijnuhbygvft~g~k~njibhuvgvgv~  k~ijnuhbygvft~g~k~njibhu↵↵~↵",
        Anime: " youkingW Q~ijnuhbygvft~g~O~njibhuvgvgv~  Q~ijnuhbygvft~g~O~njibhu↵↵~↵ ZgggZgggZgggZgggNgggNgggNggggyuiAg↵Ag↵Dy↵S~y Ag↵Ag↵↵king~↵Ag↵Ag↵Dy↵S~y Ag↵Ag  g n k i k~ijnbhu↵↵~↵ XgQgXgQgXgQgXgQgMgOgMgOgMgOggyuiAdsaDsd↵↵ijnbhu↵~~~njijAdsaDsd↵↵ijnbhu↵~~~↵   u~r O~ijnuhbggggu~r Q~ijnuhbygvft~g~O~njibhuvgvgv~  Q~ijnuhbygvft~g~O~njibhu↵↵~↵",
    }
];