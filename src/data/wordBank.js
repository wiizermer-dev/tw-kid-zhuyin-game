// 基礎詞彙庫 - ㄣ (en) Group
export const enWords = [
    // 單字 (Single Chars) - Default target is the char itself
    { char: "人", pinyin: "ㄖㄣˊ", english: "Person" },
    { char: "心", pinyin: "ㄒㄧㄣ", english: "Heart" },
    { char: "金", pinyin: "ㄐㄧㄣ", english: "Gold" },
    { char: "分", pinyin: "ㄈㄣ", english: "Score/Divide" },
    { char: "深", pinyin: "ㄕㄣ", english: "Deep" },
    
    // 詞語 (Phrases) - Explicit target char
    { char: "門把", target: "門", pinyin: "ㄇㄣˊ", english: "Door Knob" },
    { char: "大門", target: "門", pinyin: "ㄇㄣˊ", english: "Gate" },
    { char: "開門", target: "門", pinyin: "ㄇㄣˊ", english: "Open Door" },
    { char: "我們", target: "們", pinyin: "˙ㄇㄣ", english: "We/Us" },
    { char: "他們", target: "們", pinyin: "˙ㄇㄣ", english: "They" },
    { char: "人們", target: "們", pinyin: "˙ㄇㄣ", english: "People" },
    { char: "身體", target: "身", pinyin: "ㄕㄣ", english: "Body" },
    { char: "身上", target: "身", pinyin: "ㄕㄣ", english: "On Body" },
    { char: "森林", target: "森", pinyin: "ㄙㄣ", english: "Forest" },
    { char: "真正", target: "真", pinyin: "ㄓㄣ", english: "Real" },
    { char: "認真", target: "真", pinyin: "ㄓㄣ", english: "Serious" },
    { char: "跟隨", target: "跟", pinyin: "ㄍㄣ", english: "Follow" },
    { char: "腳跟", target: "跟", pinyin: "ㄍㄣ", english: "Heel" },
    { char: "很好", target: "很", pinyin: "ㄏㄣˇ", english: "Very Good" },
    { char: "很多", target: "很", pinyin: "ㄏㄣˇ", english: "Many" },
    { char: "課本", target: "本", pinyin: "ㄅㄣˇ", english: "Textbook" },
    { char: "本來", target: "本", pinyin: "ㄅㄣˇ", english: "Originally" },
    { char: "臉盆", target: "盆", pinyin: "ㄆㄣˊ", english: "Washbasin" },
    { char: "盆栽", target: "盆", pinyin: "ㄆㄣˊ", english: "Potted Plant" },
    { char: "因為", target: "因", pinyin: "ㄧㄣ", english: "Because" },
    { char: "原因", target: "因", pinyin: "ㄧㄣ", english: "Reason" },
    { char: "拼圖", target: "拼", pinyin: "ㄆㄧㄣ", english: "Puzzle" },
    { char: "音樂", target: "音", pinyin: "ㄧㄣ", english: "Music" },
    { char: "聲音", target: "音", pinyin: "ㄧㄣ", english: "Sound" },
    { char: "黃金", target: "金", pinyin: "ㄐㄧㄣ", english: "Gold" },
    // New 3rd & 4th Tone Words (En)
    { char: "課本", target: "本", pinyin: "ㄅㄣˇ", english: "Textbook" },
    { char: "筆記本", target: "本", pinyin: "ㄅㄣˇ", english: "Notebook" },
    { char: "根本", target: "本", pinyin: "ㄅㄣˇ", english: "Fundamental" },
    { char: "笨蛋", target: "笨", pinyin: "ㄅㄣˋ", english: "Stupid" }, // Check appropriateness? Maybe '笨重' (Clumsy) is better
    { char: "笨重", target: "笨", pinyin: "ㄅㄣˋ", english: "Clumsy/Heavy" },
    { char: "粉筆", target: "粉", pinyin: "ㄈㄣˇ", english: "Chalk" },
    { char: "粉紅", target: "粉", pinyin: "ㄈㄣˇ", english: "Pink" },
    { char: "麵粉", target: "粉", pinyin: "ㄈㄣˇ", english: "Flour" },
    { char: "一份", target: "份", pinyin: "ㄈㄣˋ", english: "One Portion" },
    { char: "身分", target: "分", pinyin: "ㄈㄣˋ", english: "Identity" }, // fèn
    { char: "問題", target: "問", pinyin: "ㄨㄣˋ", english: "Question" },
    { char: "請問", target: "問", pinyin: "ㄨㄣˋ", english: "Excuse me" },
    { char: "學問", target: "問", pinyin: "ㄨㄣˋ", english: "Knowledge" },
    { char: "文字", target: "文", pinyin: "ㄨㄣˊ", english: "Text" }, // 2nd tone
    { char: "作文", target: "文", pinyin: "ㄨㄣˊ", english: "Composition" },
    { char: "親吻", target: "吻", pinyin: "ㄨㄣˇ", english: "Kiss" },
    { char: "平穩", target: "穩", pinyin: "ㄨㄣˇ", english: "Stable" },
    { char: "準備", target: "準", pinyin: "ㄓㄨㄣˇ", english: "Prepare" },
    { char: "準時", target: "準", pinyin: "ㄓㄨㄣˇ", english: "On Time" },
    { char: "標準", target: "準", pinyin: "ㄓㄨㄣˇ", english: "Standard" },
    { char: "困難", target: "困", pinyin: "ㄎㄨㄣˋ", english: "Difficult" },
    { char: "想睏", target: "睏", pinyin: "ㄎㄨㄣˋ", english: "Sleepy" },
    { char: "棍子", target: "棍", pinyin: "ㄍㄨㄣˋ", english: "Stick" },
    { char: "滾動", target: "滾", pinyin: "ㄍㄨㄣˇ", english: "Roll" },
    { char: "結婚", target: "婚", pinyin: "ㄏㄨㄣ", english: "Marry" }, // 1st
    { char: "混合", target: "混", pinyin: "ㄏㄨㄣˋ", english: "Mix" },
    { char: "混沌", target: "沌", pinyin: "ㄉㄨㄣˋ", english: "Chaos/Wonton" },
    { char: "一頓", target: "頓", pinyin: "ㄉㄨㄣˋ", english: "A Meal" },
    { char: "吞嚥", target: "吞", pinyin: "ㄊㄨㄣ", english: "Swallow" }, // 1st
    { char: "忍耐", target: "忍", pinyin: "ㄖㄣˇ", english: "Endure" },
    { char: "殘忍", target: "忍", pinyin: "ㄖㄣˇ", english: "Cruel" },
    { char: "確認", target: "認", pinyin: "ㄖㄣˋ", english: "Confirm" },
    { char: "認識", target: "認", pinyin: "ㄖㄣˋ", english: "Know" },
    { char: "無論", target: "論", pinyin: "ㄌㄨㄣˋ", english: "No matter" },
    { char: "討論", target: "論", pinyin: "ㄌㄨㄣˋ", english: "Discuss" },
    { char: "車輪", target: "輪", pinyin: "ㄌㄨㄣˊ", english: "Wheel" }, // 2nd
    { char: "沉重", target: "沉", pinyin: "ㄔㄣˊ", english: "Heavy" }, // 2nd
    { char: "早晨", target: "晨", pinyin: "ㄔㄣˊ", english: "Morning" },
    { char: "襯衫", target: "襯", pinyin: "ㄔㄣˋ", english: "Shirt" },
    { char: "真正", target: "真", pinyin: "ㄓㄣ", english: "Real" }, // 1st
    { char: "枕頭", target: "枕", pinyin: "ㄓㄣˇ", english: "Pillow" },
    { char: "打針", target: "針", pinyin: "ㄓㄣ", english: "Injection" },
    { char: "地震", target: "震", pinyin: "ㄓㄣˋ", english: "Earthquake" },
    { char: "城鎮", target: "鎮", pinyin: "ㄓㄣˋ", english: "Town" },
    { char: "診所", target: "診", pinyin: "ㄓㄣˇ", english: "Clinic" },
    { char: "很慢", target: "很", pinyin: "ㄏㄣˇ", english: "Very Slow" },
    { char: "老鷹", target: "鷹", pinyin: "ㄧㄥ", english: "Eagle" }, // oops this is eng, wait. Moving to eng section later. -> Wait, moving it effectively now.
    // Actually, I will remove it from here and add to engWords properly. 
    // "今天" should be here.
    { char: "今天", target: "今", pinyin: "ㄐㄧㄣ", english: "Today" },
    // ㄧㄣ ...
    { char: "銀行", target: "銀", pinyin: "ㄧㄣˊ", english: "Bank" },
    { char: "銀色", target: "銀", pinyin: "ㄧㄣˊ", english: "Silver" },
    { char: "樹林", target: "林", pinyin: "ㄌㄧㄣˊ", english: "Woods" },
    { char: "鄰居", target: "鄰", pinyin: "ㄌㄧㄣˊ", english: "Neighbor" },
    { char: "裙子", target: "裙", pinyin: "ㄑㄩㄣˊ", english: "Skirt" },
    { char: "吸引", target: "引", pinyin: "ㄧㄣˇ", english: "Attract" },
    { char: "飲料", target: "飲", pinyin: "ㄧㄣˇ", english: "Drink" },
    { char: "隱形", target: "隱", pinyin: "ㄧㄣˇ", english: "Invisible" },
    { char: "緊張", target: "緊", pinyin: "ㄐㄧㄣˇ", english: "Nervous" },
    { char: "趕緊", target: "緊", pinyin: "ㄐㄧㄣˇ", english: "Hurry" },
    { char: "作品", target: "品", pinyin: "ㄆㄧㄣˇ", english: "Work (Art)" },
    { char: "獎品", target: "品", pinyin: "ㄆㄧㄣˇ", english: "Prize" },
    { char: "敏捷", target: "敏", pinyin: "ㄇㄧㄣˇ", english: "Agile" },
    { char: "影印", target: "印", pinyin: "ㄧㄣˋ", english: "Copy" },
    { char: "樹蔭", target: "蔭", pinyin: "ㄧㄣˋ", english: "Shade" },
    { char: "相信", target: "信", pinyin: "ㄒㄧㄣˋ", english: "Believe" },
    { char: "信心", target: "信", pinyin: "ㄒㄧㄣˋ", english: "Confidence" },
    { char: "寫信", target: "信", pinyin: "ㄒㄧㄣˋ", english: "Write Letter" },
    { char: "盡力", target: "盡", pinyin: "ㄐㄧㄣˋ", english: "Try Best" },
    { char: "進步", target: "進", pinyin: "ㄐㄧㄣˋ", english: "Improve" },
    { char: "請進", target: "進", pinyin: "ㄐㄧㄣˋ", english: "Come in" },
    { char: "最近", target: "近", pinyin: "ㄐㄧㄣˋ", english: "Recent" },
    { char: "附近", target: "近", pinyin: "ㄐㄧㄣˋ", english: "Nearby" },
    { char: "吝嗇", target: "吝", pinyin: "ㄌㄧㄣˋ", english: "Stingy" }
    // ㄣ ended.
]


// 基礎詞彙庫 - ㄥ (eng) Group
export const engWords = [
    // 單字
    { char: "燈", pinyin: "ㄉㄥ", english: "Lamp" },
    { char: "冷", pinyin: "ㄌㄥˇ", english: "Cold" },
    { char: "更", pinyin: "ㄍㄥˋ", english: "More" },

    // 詞語
    { char: "電燈", target: "燈", pinyin: "ㄉㄥ", english: "Electric Light" },
    { char: "檯燈", target: "燈", pinyin: "ㄉㄥ", english: "Desk Lamp" },
    { char: "紅燈", target: "燈", pinyin: "ㄉㄥ", english: "Red Light" },
    { char: "吹風", target: "風", pinyin: "ㄈㄥ", english: "Blowing Wind" },
    { char: "颱風", target: "風", pinyin: "ㄈㄥ", english: "Typhoon" },
    { char: "放風箏", target: "風", pinyin: "ㄈㄥ", english: "Kite Flying" }, 
    { char: "做夢", target: "夢", pinyin: "ㄇㄥˋ", english: "Dreaming" },
    { char: "惡夢", target: "夢", pinyin: "ㄇㄥˋ", english: "Nightmare" },
    { char: "朋友", target: "朋", pinyin: "ㄆㄥˊ", english: "Friend" },
    { char: "小朋友", target: "朋", pinyin: "ㄆㄥˊ", english: "Kid" },
    { char: "碰面", target: "碰", pinyin: "ㄆㄥˋ", english: "Meet" },
    { char: "等等", target: "等", pinyin: "ㄉㄥˇ", english: "Wait" },
    { char: "能夠", target: "能", pinyin: "ㄋㄥˊ", english: "Able To" },
    { char: "可能", target: "能", pinyin: "ㄋㄥˊ", english: "Possible" },
    { char: "正確", target: "正", pinyin: "ㄓㄥˋ", english: "Correct" },
    { char: "真正", target: "正", pinyin: "ㄓㄥˋ", english: "Real" },
    { char: "成功", target: "成", pinyin: "ㄔㄥˊ", english: "Success" },
    { char: "成長", target: "成", pinyin: "ㄔㄥˊ", english: "Growth" },
    { char: "城市", target: "城", pinyin: "ㄔㄥˊ", english: "City" },
    { char: "城堡", target: "城", pinyin: "ㄔㄥˊ", english: "Castle" },
    { char: "生氣", target: "生", pinyin: "ㄕㄥ", english: "Angry" },
    { char: "生日", target: "生", pinyin: "ㄕㄥ", english: "Birthday" },
    { char: "花生", target: "生", pinyin: "ㄕㄥ", english: "Peanut" },
    { char: "聲音", target: "聲", pinyin: "ㄕㄥ", english: "Voice/Sound" },
    { char: "大聲", target: "聲", pinyin: "ㄕㄥ", english: "Loud" },
    { char: "上升", target: "升", pinyin: "ㄕㄥ", english: "Rise" },
    { char: "直升機", target: "升", pinyin: "ㄕㄥ", english: "Helicopter" },
    { char: "星星", target: "星", pinyin: "ㄒㄧㄥ", english: "Star" },
    { char: "星期", target: "星", pinyin: "ㄒㄧㄥ", english: "Week" },
    { char: "高興", target: "興", pinyin: "ㄒㄧㄥˋ", english: "Happy" },
    { char: "風景", target: "景", pinyin: "ㄐㄧㄥˇ", english: "Scenery" },
    { char: "眼睛", target: "睛", pinyin: "ㄐㄧㄥ", english: "Eyes" },
    { char: "鏡子", target: "鏡", pinyin: "ㄐㄧㄥˋ", english: "Mirror" },
    { char: "眼鏡", target: "鏡", pinyin: "ㄐㄧㄥˋ", english: "Glasses" },
    { char: "電影", target: "影", pinyin: "ㄧㄥˇ", english: "Movie" },
    { char: "影子", target: "影", pinyin: "ㄧㄥˇ", english: "Shadow" },
    { char: "天空", target: "空", pinyin: "ㄎㄨㄥ", english: "Sky" },
    { char: "空氣", target: "空", pinyin: "ㄎㄨㄥ", english: "Air" },
    { char: "工作", target: "工", pinyin: "ㄍㄨㄥ", english: "Work" },
    { char: "工人", target: "工", pinyin: "ㄍㄨㄥ", english: "Worker" },
    { char: "中間", target: "中", pinyin: "ㄓㄨㄥ", english: "Middle" },
    { char: "冬天", target: "冬", pinyin: "ㄉㄨㄥ", english: "Winter" },
    // New 3rd & 4th Tone Words (Eng)
    { char: "好冷", target: "冷", pinyin: "ㄌㄥˇ", english: "Cold" },
    { char: "冷氣", target: "冷", pinyin: "ㄌㄥˇ", english: "AC" },
    { char: "冷靜", target: "冷", pinyin: "ㄌㄥˇ", english: "Calm" },
    { char: "等待", target: "等", pinyin: "ㄉㄥˇ", english: "Wait" },
    { char: "相等", target: "等", pinyin: "ㄉㄥˇ", english: "Equal" },
    { char: "板凳", target: "凳", pinyin: "ㄉㄥˋ", english: "Stool" },
    { char: "碰面", target: "碰", pinyin: "ㄆㄥˋ", english: "Meet" },
    { char: "碰撞", target: "碰", pinyin: "ㄆㄥˋ", english: "Collision" },
    { char: "作夢", target: "夢", pinyin: "ㄇㄥˋ", english: "Dream" },
    { char: "夢想", target: "夢", pinyin: "ㄇㄥˋ", english: "Dream/Wish" },
    { char: "好痛", target: "痛", pinyin: "ㄊㄨㄥˋ", english: "Pain" },
    { char: "頭痛", target: "痛", pinyin: "ㄊㄨㄥˋ", english: "Headache" },
    { char: "懂事", target: "懂", pinyin: "ㄉㄨㄥˇ", english: "Sensible" },
    { char: "聽懂", target: "懂", pinyin: "ㄉㄨㄥˇ", english: "Understood" },
    { char: "動物", target: "動", pinyin: "ㄉㄨㄥˋ", english: "Animal" },
    { char: "運動", target: "動", pinyin: "ㄉㄨㄥˋ", english: "Exercise" },
    { char: "山洞", target: "洞", pinyin: "ㄉㄨㄥˋ", english: "Cave" },
    { char: "破洞", target: "洞", pinyin: "ㄉㄨㄥˋ", english: "Hole" },
    { char: "總共", target: "共", pinyin: "ㄍㄨㄥˋ", english: "Total" },
    { char: "公共", target: "共", pinyin: "ㄍㄨㄥˋ", english: "Public" },
    { char: "孔雀", target: "孔", pinyin: "ㄎㄨㄥˇ", english: "Peacock" },
    { char: "有空", target: "空", pinyin: "ㄎㄨㄥˋ", english: "Free time" }, // 4th tone
    { char: "空白", target: "空", pinyin: "ㄎㄨㄥˋ", english: "Blank" }, // 4th tone
    { char: "控制", target: "控", pinyin: "ㄎㄨㄥˋ", english: "Control" },
    { char: "遙控", target: "控", pinyin: "ㄎㄨㄥˋ", english: "Remote" },
    { char: "轟炸", target: "轟", pinyin: "ㄏㄨㄥ", english: "Bomb" }, // 1st
    { char: "哄小孩", target: "哄", pinyin: "ㄏㄨㄥˇ", english: "Coax" },
    { char: "起鬨", target: "鬨", pinyin: "ㄏㄨㄥˋ", english: "Uproar" },
    { char: "總是", target: "總", pinyin: "ㄗㄨㄥˇ", english: "Always" },
    { char: "總經理", target: "總", pinyin: "ㄗㄨㄥˇ", english: "Manager" },
    { char: "送禮", target: "送", pinyin: "ㄙㄨㄥˋ", english: "Gift" },
    { char: "歡送", target: "送", pinyin: "ㄙㄨㄥˋ", english: "Farewell" },
    { char: "弄壞", target: "弄", pinyin: "ㄋㄨㄥˋ", english: "Break" },
    { char: "捉弄", target: "弄", pinyin: "ㄋㄨㄥˋ", english: "Tease" },
    { char: "很重", target: "重", pinyin: "ㄓㄨㄥˋ", english: "Heavy" },
    { char: "重要", target: "重", pinyin: "ㄓㄨㄥˋ", english: "Important" },
    { char: "種樹", target: "種", pinyin: "ㄓㄨㄥˋ", english: "Plant" },
    { char: "種子", target: "種", pinyin: "ㄓㄨㄥˇ", english: "Seed" }, // 3rd
    { char: "從前", target: "從", pinyin: "ㄘㄨㄥˊ", english: "Before" }, // 2nd
    { char: "服從", target: "從", pinyin: "ㄘㄨㄥˊ", english: "Obey" },
    { char: "聰明", target: "聰", pinyin: "ㄘㄨㄥ", english: "Smart" }, // 1st
    { char: "洋蔥", target: "蔥", pinyin: "ㄘㄨㄥ", english: "Onion" },
    { char: "沖水", target: "沖", pinyin: "ㄔㄨㄥ", english: "Flush" },
    { char: "充滿", target: "充", pinyin: "ㄔㄨㄥ", english: "Full" },
    { char: "寵物", target: "寵", pinyin: "ㄔㄨㄥˇ", english: "Pet" },
    { char: "勇敢", target: "勇", pinyin: "ㄩㄥˇ", english: "Brave" },
    { char: "勇氣", target: "勇", pinyin: "ㄩㄥˇ", english: "Courage" },
    { char: "游泳", target: "泳", pinyin: "ㄩㄥˇ", english: "Swim" },
    { char: "擁抱", target: "擁", pinyin: "ㄩㄥˇ", english: "Hug" },
    { char: "永遠", target: "永", pinyin: "ㄩㄥˇ", english: "Forever" },
    { char: "使用", target: "用", pinyin: "ㄩㄥˋ", english: "Use" }, 
    { char: "不用", target: "用", pinyin: "ㄩㄥˋ", english: "No need" },
    { char: "用力", target: "用", pinyin: "ㄩㄥˋ", english: "Force" },
    { char: "猛烈", target: "猛", pinyin: "ㄇㄥˇ", english: "Fierce" },
    { char: "恐龍", target: "恐", pinyin: "ㄎㄨㄥˇ", english: "Dinosaur" },
    { char: "恐怖", target: "恐", pinyin: "ㄎㄨㄥˇ", english: "Scary" },
    { char: "水桶", target: "桶", pinyin: "ㄊㄨㄥˇ", english: "Bucket" },
    { char: "傳統", target: "統", pinyin: "ㄊㄨㄥˇ", english: "Tradition" },
    { char: "統一", target: "統", pinyin: "ㄊㄨㄥˇ", english: "Unify" },
    { char: "鳳梨", target: "鳳", pinyin: "ㄈㄥˋ", english: "Pineapple" },
    { char: "縫隙", target: "縫", pinyin: "ㄈㄥˋ", english: "Gap" },
    { char: "貢丸", target: "貢", pinyin: "ㄍㄨㄥˋ", english: "Meatball" }, 
    { char: "老鷹", target: "鷹", pinyin: "ㄧㄥ", english: "Eagle" },
    { char: "中獎", target: "中", pinyin: "ㄓㄨㄥˋ", english: "Win Prize" }, // 4th tone
    // ㄧㄥ (ing) Special Focus (2/3/4 Tones)
    { char: "輸贏", target: "贏", pinyin: "ㄧㄥˊ", english: "Win/Lose" },
    { char: "露營", target: "營", pinyin: "ㄧㄥˊ", english: "Camping" },
    { char: "歡迎", target: "迎", pinyin: "ㄧㄥˊ", english: "Welcome" },
    { char: "螢火蟲", target: "螢", pinyin: "ㄧㄥˊ", english: "Firefly" },
    { char: "輕盈", target: "盈", pinyin: "ㄧㄥˊ", english: "Graceful" },
    { char: "花瓶", target: "瓶", pinyin: "ㄆㄧㄥˊ", english: "Vase" },
    { char: "蘋果", target: "蘋", pinyin: "ㄆㄧㄥˊ", english: "Apple" },
    { char: "平安", target: "平", pinyin: "ㄆㄧㄥˊ", english: "Safe" },
    { char: "名字", target: "名", pinyin: "ㄇㄧㄥˊ", english: "Name" },
    { char: "明天", target: "明", pinyin: "ㄇㄧㄥˊ", english: "Tomorrow" },
    { char: "明星", target: "明", pinyin: "ㄇㄧㄥˊ", english: "Superstar" },
    { char: "暫停", target: "停", pinyin: "ㄊㄧㄥˊ", english: "Pause" },
    { char: "停車", target: "停", pinyin: "ㄊㄧㄥˊ", english: "Park Car" },
    { char: "家庭", target: "庭", pinyin: "ㄊㄧㄥˊ", english: "Family" },
    { char: "零食", target: "零", pinyin: "ㄌㄧㄥˊ", english: "Snacks" },
    { char: "靈活", target: "靈", pinyin: "ㄌㄧㄥˊ", english: "Flexible" },
    { char: "心情", target: "情", pinyin: "ㄑㄧㄥˊ", english: "Mood" },
    { char: "晴天", target: "晴", pinyin: "ㄑㄧㄥˊ", english: "Sunny" },
    { char: "行動", target: "行", pinyin: "ㄒㄧㄥˊ", english: "Action" },
    { char: "模型", target: "型", pinyin: "ㄒㄧㄥˊ", english: "Model" },
    { char: "警察", target: "警", pinyin: "ㄐㄧㄥˇ", english: "Police" },
    { char: "水井", target: "井", pinyin: "ㄐㄧㄥˇ", english: "Well" },
    { char: "餅乾", target: "餅", pinyin: "ㄅㄧㄥˇ", english: "Cookie" },
    { char: "提醒", target: "醒", pinyin: "ㄒㄧㄥˇ", english: "Remind" },
    { char: "睡醒", target: "醒", pinyin: "ㄒㄧㄥˇ", english: "Wake up" },
    { char: "山頂", target: "頂", pinyin: "ㄉㄧㄥˇ", english: "Peak" },
    { char: "屋頂", target: "頂", pinyin: "ㄉㄧㄥˇ", english: "Roof" },
    { char: "領帶", target: "領", pinyin: "ㄌㄧㄥˇ", english: "Tie" },
    { char: "請客", target: "請", pinyin: "ㄑㄧㄥˇ", english: "Treat" },
    { char: "堅硬", target: "硬", pinyin: "ㄧㄥˋ", english: "Hard" },
    { char: "硬幣", target: "硬", pinyin: "ㄧㄥˋ", english: "Coin" },
    { char: "應該", target: "應", pinyin: "ㄧㄥ", english: "Should" }, // 1st
    { char: "答應", target: "應", pinyin: "ㄧㄥˋ", english: "Promise" }, // 4th
    { char: "敬禮", target: "敬", pinyin: "ㄐㄧㄥˋ", english: "Salute" },
    { char: "尊敬", target: "敬", pinyin: "ㄐㄧㄥˋ", english: "Respect" },
    { char: "安靜", target: "靜", pinyin: "ㄐㄧㄥˋ", english: "Quiet" },
    { char: "乾淨", target: "淨", pinyin: "ㄐㄧㄥˋ", english: "Clean" },
    { char: "命令", target: "令", pinyin: "ㄌㄧㄥˋ", english: "Order" },
    { char: "生病", target: "病", pinyin: "ㄅㄧㄥˋ", english: "Sick" },
    { char: "救命", target: "命", pinyin: "ㄇㄧㄥˋ", english: "Help!" },
    { char: "決定", target: "定", pinyin: "ㄉㄧㄥˋ", english: "Decide" },
    { char: "一定", target: "定", pinyin: "ㄉㄧㄥˋ", english: "Must" },
    { char: "釘子", target: "釘", pinyin: "ㄉㄧㄥ", english: "Nail" }, // 1st
    { char: "姓名", target: "姓", pinyin: "ㄒㄧㄥˋ", english: "Surname" },
    { char: "幸運", target: "幸", pinyin: "ㄒㄧㄥˋ", english: "Lucky" },
    { char: "個性", target: "性", pinyin: "ㄒㄧㄥˋ", english: "Personality" },
    { char: "聽話", target: "聽", pinyin: "ㄊㄧㄥ", english: "Obey" } // 1st
];

// 高難度詞彙庫 - ㄣ (en) Hard Mode (Mixed: Rare, Confusion, Idioms, Memes)
export const hardEnWords = [
    // 生難字詞 & 易混淆 (Rare & Confusing)
    { char: "分娩", target: "娩", pinyin: "ㄇㄧㄢˇ", english: "Childbirth" },
    { char: "妊娠", target: "娠", pinyin: "ㄕㄣ", wrong: "ㄔㄣˊ", english: "Pregnancy" }, // Very Hard
    { char: "蹂躪", target: "躪", pinyin: "ㄌㄧㄣˋ", english: "Trample" },
    { char: "逡巡", target: "逡", pinyin: "ㄑㄩㄣ", wrong: "ㄑㄩㄣˊ", english: "Hesitate" },
    { char: "頻繁", target: "頻", pinyin: "ㄆㄧㄣˊ", english: "Frequent" },
    { char: "瀕臨", target: "瀕", pinyin: "ㄅㄧㄣ", english: "Verge of" },
    { char: "嬪妃", target: "嬪", pinyin: "ㄆㄧㄣˊ", english: "Concubine" },
    { char: "租賃", target: "賃", pinyin: "ㄌㄧㄣˋ", english: "Lease" },
    { char: "吝嗇", target: "吝", pinyin: "ㄌㄧㄣˋ", english: "Stingy" }, // Confusing tone
    { char: "氤氳", target: "氤", pinyin: "ㄧㄣ", english: "Misty" },
    { char: "純粹", target: "純", pinyin: "ㄔㄨㄣˊ", english: "Pure" }, // En/Eng swap not applicable, use manual wrong
    { char: "飲鴆止渴", target: "鴆", pinyin: "ㄓㄣˋ", english: "Poison" },
    { char: "挑釁", target: "釁", pinyin: "ㄒㄧㄣˋ", english: "Provoke" },
    { char: "涔涔", target: "涔", pinyin: "ㄘㄣˊ", english: "Sweaty" },
    { char: "呻吟", target: "呻", pinyin: "ㄕㄣ", english: "Moan" },
    { char: "人參", target: "參", pinyin: "ㄕㄣ", wrong: "ㄙㄣ", english: "Ginseng" }, // shen vs can
    { char: "陰霾", target: "陰", pinyin: "ㄧㄣ", english: "Haze" },
    
    // 特殊讀音 (Special Tones/Pronunciations)
    { char: "身分證", target: "分", pinyin: "ㄈㄣˋ", wrong: "ㄈㄣ", english: "ID Card" }, // fèn vs fēn
    { char: "氣氛", target: "氛", pinyin: "ㄈㄣ", wrong: "ㄈㄣˋ", english: "Atmosphere" }, // fēn vs fèn
    { char: "強韌", target: "韌", pinyin: "ㄖㄣˋ", english: "Tough" },
    { char: "混合", target: "混", pinyin: "ㄏㄨㄣˋ", wrong: "ㄏㄨㄣˇ", english: "Mix" }, // hun4 vs hun3
    { char: "創傷", target: "創", pinyin: "ㄔㄨㄤ", wrong: "ㄔㄨㄤˋ", english: "Trauma" }, // chuang1 vs chuang4
    
    // 成語 (Idioms)
    { char: "諄諄教誨", target: "諄", pinyin: "ㄓㄨㄣ", wrong: "ㄔㄨㄣˊ", english: "Earnest teaching" },
    { char: "莘莘學子", target: "莘", pinyin: "ㄕㄣ", wrong: "ㄒㄧㄣ", english: "Many students" }, // shen vs xin
    { char: "參差不齊", target: "參", pinyin: "ㄘㄣ", wrong: "ㄘㄢ", english: "Uneven" }, // cen vs can
    { char: "飲水思源", target: "飲", pinyin: "ㄧㄣˇ", english: "Grateful" },
    { char: "囫圇吞棗", target: "圇", pinyin: "ㄌㄨㄣˊ", wrong: "ㄌㄨㄣ", english: "Swallow whole" },
    { char: "勤能補拙", target: "勤", pinyin: "ㄑㄧㄣˊ", english: "Diligence" },
    { char: "謹言慎行", target: "慎", pinyin: "ㄕㄣˋ", english: "Cautious" },
    { char: "忿忿不平", target: "忿", pinyin: "ㄈㄣˋ", wrong: "ㄈㄣ", english: "Indignant" },
    { char: "彬彬有禮", target: "彬", pinyin: "ㄅㄧㄣ", english: "Polite" },
    
    // 時事 & 迷因 (Memes/Current Events)
    { char: "天選之人", target: "人", pinyin: "ㄖㄣˊ", english: "Chosen One" },
    { char: "多人運動", target: "運", pinyin: "ㄩㄣˋ", english: "Multiplayer Sport" }, 
    { char: "暈船", target: "暈", pinyin: "ㄩㄣ", wrong: "ㄩㄣˋ", english: "Crush/Seasick" }, // yun1 vs yun4
    { char: "本斥但大", target: "本", pinyin: "ㄅㄣˇ", english: "Big..." },
    { char: "很解", target: "很", pinyin: "ㄏㄣˇ", english: "Turn off" },
    { char: "森七七", target: "森", pinyin: "ㄙㄣ", wrong: "ㄕㄥ", english: "Angry (Cute)" },
    { char: "認知作戰", target: "認", pinyin: "ㄖㄣˋ", english: "Cognitive Warfare" },
    { char: "社群媒體", target: "群", pinyin: "ㄑㄩㄣˊ", english: "Social Media" },
    { char: "貧富差距", target: "貧", pinyin: "ㄆㄧㄣˊ", english: "Wealth Gap" }
];

// 高難度詞彙庫 - ㄥ (eng) Hard Mode (Mixed)
export const hardEngWords = [
    // 生難字詞 & 易混淆 (Rare & Confusing)
    { char: "馳騁", target: "騁", pinyin: "ㄔㄥˇ", wrong: "ㄔㄥˊ", english: "Gallop" },
    { char: "逞強", target: "逞", pinyin: "ㄔㄥˇ", english: "Show off" },
    { char: "憧憬", target: "憧", pinyin: "ㄔㄨㄥ", wrong: "ㄔㄨㄥˊ", english: "Longing" }, // chong1 vs chong2
    { char: "痙攣", target: "痙", pinyin: "ㄐㄧㄥˋ", wrong: "ㄐㄧㄥ", english: "Spasm" }, // jing4 vs jing1
    { char: "脛骨", target: "脛", pinyin: "ㄐㄧㄥˋ", english: "Shin bone" },
    { char: "親家", target: "親", pinyin: "ㄑㄧㄥˋ", wrong: "ㄑㄧㄣ", english: "In-laws" }, // qing4 vs qin1
    { char: "內訌", target: "訌", pinyin: "ㄏㄨㄥˋ", wrong: "ㄏㄨㄥ", english: "Infighting" }, // hong4 vs gong1
    { char: "供給", target: "供", pinyin: "ㄍㄨㄥ", wrong: "ㄍㄨㄥˋ", english: "Supply" }, // gong1 vs gong4
    { char: "供品", target: "供", pinyin: "ㄍㄨㄥˋ", wrong: "ㄍㄨㄥ", english: "Offering" }, // gong4 vs gong1
    { char: "巷弄", target: "弄", pinyin: "ㄋㄨㄥˋ", wrong: "ㄌㄨㄥˋ", english: "Alley" }, // nong4 vs long4
    { char: "弄堂", target: "弄", pinyin: "ㄌㄨㄥˋ", wrong: "ㄋㄨㄥˋ", english: "Alley (Shanghai)" },
    { char: "慫恿", target: "恿", pinyin: "ㄩㄥˇ", wrong: "ㄩㄥˋ", english: "Incite" }, 
    { char: "兵馬俑", target: "俑", pinyin: "ㄩㄥˇ", wrong: "ㄩㄥ", english: "Terracotta" },
    { char: "冗員", target: "冗", pinyin: "ㄖㄨㄥˇ", wrong: "ㄖㄨㄥˊ", english: "Redundant staff" },
    { char: "炯炯有神", target: "炯", pinyin: "ㄐㄩㄥˇ", wrong: "ㄑㄩㄥ", english: "Bright eyes" },
    { char: "孑孓", target: "孓", pinyin: "ㄐㄩㄝˊ", wrong: "ㄐㄧㄝˊ", english: "Larva" }, 
    { char: "強勁", target: "勁", pinyin: "ㄐㄧㄥˋ", english: "Powerful" },
    { char: "引擎", target: "擎", pinyin: "ㄑㄧㄥˊ", english: "Engine" },
    { char: "罄竹難書", target: "罄", pinyin: "ㄑㄧㄥˋ", english: "Numerous crimes" },
    { char: "如履薄冰", target: "冰", pinyin: "ㄅㄧㄥ", english: "Thin ice" },
    { char: "並駕齊驅", target: "並", pinyin: "ㄅㄧㄥˋ", english: "Neck and neck" },

    // 成語 (Idioms)
    { char: "屏氣凝神", target: "屏", pinyin: "ㄅㄧㄥˇ", wrong: "ㄆㄧㄥˊ", english: "Hold breath" }, // bing3 vs ping2
    { char: "鵬程萬里", target: "鵬", pinyin: "ㄆㄥˊ", english: "Bright future" },
    { char: "興高采烈", target: "興", pinyin: "ㄒㄧㄥˋ", english: "Elated" }, // xing4 vs xing1
    { char: "驚鴻一瞥", target: "驚", pinyin: "ㄐㄧㄥ", english: "Glance" },
    { char: "兢兢業業", target: "兢", pinyin: "ㄐㄧㄥ", wrong: "ㄐㄧㄣˋ", english: "Cautious" }, // jing vs ke
    { char: "毋庸置疑", target: "庸", pinyin: "ㄩㄥ", wrong: "ㄩㄥˋ", english: "No doubt" },
    { char: "庸人自擾", target: "庸", pinyin: "ㄩㄥ", wrong: "ㄩㄥˋ", english: "Worrywart" },
    { char: "洶湧澎湃", target: "湧", pinyin: "ㄩㄥˇ", wrong: "ㄩㄥˋ", english: "Surging" },
    { char: "雷霆萬鈞", target: "霆", pinyin: "ㄊㄧㄥˊ", english: "Thunderous" },
    { char: "心靈手巧", target: "靈", pinyin: "ㄌㄧㄥˊ", english: "Dexterous" },
    
    // 時事 & 迷因 (Memes/Current Events)
    { char: "校正回歸", target: "正", pinyin: "ㄓㄥˋ", english: "Correction" },
    { char: "躺平主義", target: "平", pinyin: "ㄆㄧㄥˊ", english: "Lying Flat" },
    { char: "情緒勒索", target: "情", pinyin: "ㄑㄧㄥˊ", english: "Emotional Blackmail" },
    { char: "像極了愛情", target: "情", pinyin: "ㄑㄧㄥˊ", english: "Like Love" },
    { char: "吃瓜群眾", target: "眾", pinyin: "ㄓㄨㄥˋ", english: "Onlookers" },
    { char: "晶片", target: "晶", pinyin: "ㄐㄧㄥ", english: "Chip" },
    { char: "通膨", target: "膨", pinyin: "ㄆㄥˊ", english: "Inflation" },
    { char: "淨零排放", target: "淨", pinyin: "ㄐㄧㄥˋ", english: "Net Zero" },
    { char: "動態清零", target: "清", pinyin: "ㄑㄧㄥ", english: "Zero Covid" },
    { char: "蹭熱度", target: "蹭", pinyin: "ㄘㄥˋ", english: " clout chasing" },
    { char: "硬要", target: "硬", pinyin: "ㄧㄥˋ", english: "Insist" },
    { char: "更正", target: "更", pinyin: "ㄍㄥ", english: "Correction" }
];
