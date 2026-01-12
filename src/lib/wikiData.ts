export const WIKI_CONTENT: Record<string, { title: string; content: string }> = {
    ground_zero: {
        title: 'Ground Zero (グラウンドゼロ)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Ground Zero』は、タルコフ市の中心街にある近代的なオフィス街です。TerraGroup本社ビルやEmpireビルといった高層ビルが立ち並び、マップ中央を貫く大通りが特徴的です。</p>
            <p>このマップは、Lv20以下の「初心者（Beginner）」とLv21以上の「上級者（Experienced）」でマッチングが完全に分かれているのが最大の特徴です。初心者にとってはゲームの基礎を学ぶ場ですが、上級者マッチでは狭いエリアに熟練プレイヤーが密集するため、激しいPvPが発生する危険地帯となります。マップ全体が比較的狭く、敵との遭遇率が高いため、常に周囲への警戒が必要です。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は合計6箇所です。</p>
            <ul>
                <li><strong>Emercom Checkpoint (All)</strong>: マップ南東の検問所付近です。PMCとScavの両方が利用でき、特別な条件もありません。ただし、開けた場所にあるため、脱出判定が出るまでの間、周囲からの狙撃に注意が必要です。</li>
                <li><strong>Mira Ave (PMC / 緑フレアが必要)</strong>: マップ西側の突き当たりにある大通りです。ここを通るには、指定されたエリアで「緑色の信号弾（Green Flare）」を空に向かって撃ち上げ、スナイパーエリアを無効化する必要があります。フレアなしで進むとスナイパーに撃たれ死亡します。</li>
                <li><strong>Nakatani Basement Stairs (All)</strong>: マップ北側にある「Nakatani」ビルの地下へ続く階段です。比較的安全にアクセスしやすく、初心者にも使いやすい脱出地点です。</li>
                <li><strong>Police Cordon V-Ex (PMC / 有料・車)</strong>: 警察署近くのバリケードにある黒いSUVです。利用にはルーブル（現金）が必要です。誰かが使用すると車が走り去り、そのレイドでは使用不可になります。Scavカルマが高いと費用が安くなります。</li>
                <li><strong>Scav Checkpoint (Co-op / PMC+Scav協力)</strong>: マップ南側の瓦礫エリアです。PMCとプレイヤーScavが協力して（近くに立って）脱出する必要があります。成功すればFenceから報酬が送られてきます。</li>
                <li><strong>Tartowers Sales Office (All / アイテム「Note with code word Adaptation」が必要)</strong>: 一般的な脱出地点とは異なり、特定のアイテムが必要です。脱出には「Note with code word Adaptation」を所持している必要があります。タスクやイベント進行に関連する場合が多い場所です。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <p>マラソンモード等で次のマップへ移動するポイントです。</p>
            <ul>
                <li><strong>To Streets of Tarkov</strong>: Mira Aveの先、またはSewer River付近から移動可能です。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <p>オフィス街であるため、PCパーツや電子機器、医薬品が豊富です。</p>
            <ul>
                <li><strong>TerraGroup本社ビル</strong>: マップの象徴的な建物。オフィス内にはPCブロックが多く、GPUなどを狙えます。ロビーには貴重品が湧くこともあります。</li>
                <li><strong>Empireビル</strong>: TerraGroupの向かいにあるビル。ここもPCやダッフルバッグが多く、探索価値が高いです。</li>
                <li><strong>飲食店</strong>: 大通り沿いにはカフェなどが多く、食料や水、「砂糖」などの雑貨が見つかります。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>大通りを避ける</strong>: 中央のメインストリートは射線が通りすぎており危険です。建物の中を通り抜けるか、裏道を利用しましょう。</li>
                <li><strong>窓際に立たない</strong>: ビルの2階以上は視界が良いですが、外からも丸見えです。漁る際は窓から離れましょう。</li>
                <li><strong>クレイモア（地雷）に注意</strong>: 銀行のような建物（Capital Insight）の2階廊下など、特定の場所にはクレイモアが設置されています。不用意に近づくと即死します。</li>
            </ul>
        `
    },
    streets: {
        title: 'Streets of Tarkov (ストリーツ・オブ・タルコフ)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Streets of Tarkov』は、タルコフ市街の広大な居住区と商業区を再現した、本作最大規模かつ最密度のマップです。 アパート、ホテル、モール、カーディーラーなど多彩な施設があり、アイテムの湧き数は全マップ屈指です。しかし、プレイヤー数（PMC/Scav）も非常に多く、四方八方から銃声が聞こえる激戦区でもあります。構造が複雑で迷いやすいため、マップツールでの位置確認が必須です。ボス「Kaban」や「Killa」が出現する可能性もあります。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は合計17箇所と非常に多いですが、PMCが常時使える場所は限られています。</p>
            <ul>
                <li><strong>Klimov Street (PMC / 緑フレアが必要)</strong>: アーチ状の緑色の建物（Pinewoodホテル）横の大通りです。エリア進入前に「緑色の信号弾（Green Flare）」を空に撃ち上げ、スナイパーを無効化する必要があります。</li>
                <li><strong>Courtyard (PMC / 緑煙が出ている時のみ)</strong>: Pinewoodホテルの中庭です。脱出可能な場合のみ、緑色の煙が焚かれています。</li>
                <li><strong>Primorsky Ave Taxi V-Ex (PMC / 有料・車)</strong>: 大通りにある黒いタクシーです。利用にはルーブルが必要です。</li>
                <li><strong>Stylobate Building Elevator (PMC / 条件なし)</strong>: 特定の建物内にあるエレベーターです。以前は条件が必要な場合もありましたが、現在はボタンを押して待つだけで利用できる貴重な脱出地点です。</li>
                <li><strong>Sewer River (PMC)</strong>: 路面電車の線路がある大通りの端、崩れた地下への入り口です。地下鉄エリアを通って脱出します。</li>
                <li><strong>Collapsed Crane (PMC)</strong>: 建設現場近くの倒れたクレーン付近です。</li>
                <li><strong>Damaged House (PMC)</strong>: 破壊された家屋があるエリアです。比較的戦闘を避けて到達しやすい場所です。</li>
                <li><strong>Crash Site (PMC)</strong>: ヘリコプターの墜落現場付近ではありませんが、名称として使われているエリアです（実際の場所はマップ参照）。</li>
                <li><strong>Expo Checkpoint (PMC)</strong>: 展示場（Expo）近くの検問所です。</li>
                <li><strong>Smugglers' Basement (All / ノート「Onyx」が必要な場合あり)</strong>: 特定のアイテムが必要になる場合があるため、条件をよく確認してください。</li>
                <li><strong>Pinewood Basement (Co-op / PMC+Scav協力)</strong>: Pinewoodホテルの地下です。PMCとScavの協力が必要です。</li>
                <li><strong>Scav専用脱出地点</strong>: Cardinal Apartment Complex Parking, Entrance to Catacombs, Klimov Shopping Mall Exfil, Near Kamchatskaya Arch, Sewer Manhole, Ventilation Shaft これらはScavプレイ時のみ利用可能です。特にSewer ManholeなどはPMCとの接敵を避けやすく便利です。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Interchange</strong>: マップ北西端、Expo Checkpoint付近から移動できます。</li>
                <li><strong>To The Lab</strong>: マップ特定箇所（ボスエリア付近や地下等）から移動できます。</li>
                <li><strong>To Ground Zero</strong>: Klimov Streetエリア付近またはSewer River付近から移動できます。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <ul>
                <li><strong>LexOs (自動車ディーラー)</strong>: ボス「Kaban」の出現エリア。地雷や機銃で要塞化されており危険ですが、最上級の装備が手に入ります。</li>
                <li><strong>Chekannaya 15 (アパート)</strong>: 鍵が必要な部屋からは、貴重品やレアな銃器パーツが湧きます。</li>
                <li><strong>Pinewood Hotel</strong>: 部屋数が多く、食料や工具、日用品などあらゆるアイテムが揃います。</li>
                <li><strong>Post Office (郵便局) & Beluga Restaurant</strong>: インテリジェンス（機密書類）や貴重品が狙い目です。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>大通り横断は慎重に</strong>: Primorsky Aveなどの大通りはスナイパーの的です。スタミナがある時に一気に走るか、遮蔽物を利用して進みましょう。</li>
                <li><strong>地雷エリアを把握する</strong>: LexOs周辺やマップ外周の一部には地雷やスナイパーエリアがあります。看板やマップ上の警告エリアを必ず確認してください。</li>
                <li><strong>BTRタクシーの活用</strong>: マップを巡回する装甲車（BTR）にお金を払えば、安全な移動やアイテムのスタッシュ転送が可能です。</li>
            </ul>
        `
    },
    interchange: {
        title: 'Interchange (インターチェンジ)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Interchange』は、巨大なショッピングモール「ULTRA」を舞台とした屋内戦主体のマップです。マップは大きく分けて「屋外駐車場」「地下駐車場」「ショッピングモール（1階・2階）」の3層構造になっています。</p>
            <p>最大の特徴は、屋内特有の「暗さ」と「音の響き方」です。昼間でもモール内は薄暗く、死角が非常に多いため、角待ちや不意の遭遇戦が多発します。また、ボスの「Killa」は非常に好戦的で強力なアーマーと火力を持っており、多くのプレイヤーにとって脅威かつ狩りの対象です。</p>
            <p>食料、工具、電子機器の湧きが豊富で、特定の店舗には高額なアイテムが集中するため、PMCが集まる激戦区が明確に分かれています。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点はモールの外周に配置されていますが、数は多くありません。そのため、脱出地点で待ち伏せする敵（出待ち）に遭遇するリスクが他のマップよりも高い傾向にあります。</p>
            <ul>
                <li><strong>Emercom Checkpoint (All)</strong>: マップ南東のテントエリア。最も利用頻度が高い脱出地点ですが、それゆえに茂みに隠れたスナイパーや出待ちに狙われやすい危険な場所でもあります。クリアリングを徹底してください。</li>
                <li><strong>Path to River (PMC / 緑フレアが必要)</strong>: 緑色の信号弾（Green Flare）が必要です。比較的新しく追加された脱出地点です。</li>
                <li><strong>Power Station V-Ex (PMC / 有料・車)</strong>: マップ北東の発電所裏にある黒いSUV。利用にはルーブルが必要です。発電所はアイテムが美味しいため、接敵率が高いエリアです。</li>
                <li><strong>Railway Exfil (All)</strong>: マップ北西の線路沿い。Emercomと対になる主要な脱出地点です。列車やコンテナの影が多く、ここも警戒が必要です。</li>
                <li><strong>Saferoom Exfil (PMC / #11SRキーカードと電源ONが必要)</strong>: 通称「セーフルーム」。利用手順が非常に複雑です。まず発電所で電源を入れ、モール2階のバーガーショップにあるトイレで「#11SR」キーカードを切ってスイッチを押し、駐車場にある隠し扉を開ける必要があります。非常に安全に脱出できますが、準備と高価な鍵が必要です。</li>
                <li><strong>Scav Camp (Co-op / PMC+Scav協力)</strong>: モール正面のハイウェイ上にあるコンテナ付近。PMCとScavが協力して脱出する必要があります。</li>
                <li><strong>Smugglers' Tunnel (All / アイテム「Interchange underground utility plan」が必要)</strong>: 脱出には特定のアイテム「Interchange underground utility plan」を所持している必要があります。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Customs</strong>: Scav Camp付近、ハイウェイの端から移動可能です。</li>
                <li><strong>To Streets of Tarkov</strong>: Railway Exfil側の道路奥から移動可能です。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <p>「何でも揃う」と言われるほど物資が豊富ですが、エリアごとに特色があります。</p>
            <ul>
                <li><strong>OLI (緑色のエリア)</strong>: ホームセンター。ホース、モーター、燃料、ボルトなどの隠れ家（Hideout）強化用素材や交換用アイテムが大量に手に入ります。</li>
                <li><strong>Goshan (赤色のエリア)</strong>: スーパーマーケット。缶詰やジュースなどの食料品が棚一面に並んでいます。ここに来れば飲食に困ることはありません。</li>
                <li><strong>IDEA (青色のエリア)</strong>: 家具屋。彫像（ライオン、猫など）や電子機器が湧きやすいです。</li>
                <li><strong>Tech Stores (電気屋)</strong>: 「Techlight」「Rasmussen」「Texho」などの店舗には、グラフィックボード（GPU）やテトリスなどの高額な電子機器が湧きます。これらを巡るPMC同士の初動戦闘が非常に激しいです。</li>
                <li><strong>KIBA Arms</strong>: モール中央にある銃器店。入るには2枚の鍵と電源が必要ですが、高性能な武器やパーツ、アーマーが手に入ります。ガラス張りで外から丸見えなのが難点です。</li>
                <li><strong>Ultra Medical</strong>: 2階にある医療保管庫。鍵が必要ですが、LEDXや除細動器などの超高額医療品が狙えます。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>暗所対策をする</strong>: モール内は非常に暗いため、敵を視認するのが困難です。フラッシュライトを武器に装着するか、可能であればポストFXの設定で見やすく調整することをお勧めします。</li>
                <li><strong>音に敏感になる</strong>: 鉄板の上を歩く音、ガラスを踏む音、エスカレーターを走る音など、Interchangeは足音が非常によく響きます。不用意にダッシュすると位置がバレるため、接敵が予想される場所では歩き移動を基本にしましょう。</li>
                <li><strong>出待ちを警戒する</strong>: 特に「Emercom Checkpoint」は悪名高い出待ちスポットです。脱出地点に向かう際は、残り時間がギリギリになるまで様子を見るか、スタミナを残した状態で遮蔽物を使いながら慎重にアプローチしてください。</li>
            </ul>
        `
    },
    customs: {
        title: 'Customs (カスタム)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Customs』は、工業地帯、倉庫、寮、ガソリンスタンドなどで構成されるマップです。多くの初期タスク（クエスト）がこのマップに集中しているため、全てのプレイヤーが最初に通る道と言えます。</p>
            <p>マップ形状が横に細長く、エリアを分断するように川が流れています。川を渡るための橋や抜け道が限られているため、プレイヤー同士の動線が重なりやすく、「チョークポイント（激戦になる狭所）」での戦闘が避けられません。初心者が基本を学ぶのに適していますが、同時に高レベルプレイヤーもタスクやPvP目的で訪れるため、気が抜けないマップです。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は25箇所と非常に多いですが、Scav専用も多く含まれます。</p>
            <ul>
                <li><strong>Crossroads (All)</strong>: マップ西側の端。西側スポーン以外のプレイヤーが主に利用します。</li>
                <li><strong>ZB-1011 (PMC)</strong>: マップ東側の端にある地下シェルター。東側スポーン以外のプレイヤーにとっての確定脱出地点です。</li>
                <li><strong>Old Gas Station (All / 緑煙が出ている時のみ)</strong>: 古いガソリンスタンドの地下。緑色の煙が出ている時のみ使用可能です。稀にテーブルの上に超レアアイテム（魔法陣湧き）があります。</li>
                <li><strong>Dorms V-Ex (PMC / 有料・車)</strong>: 寮（Dorms）の北側にある黒いSUV。ルーブルが必要です。寮での戦闘が終わった後の脱出によく使われます。</li>
                <li><strong>Railroad Passage (Flare) (PMC / 緑フレアが必要)</strong>: 緑色の信号弾（Green Flare）が必要です。</li>
                <li><strong>Smuggler's Boat (All / アイテム「Note with code word Voron」が必要)</strong>: 川沿いの焚き火がある場所にあるボートです。脱出には特定のアイテム「Note with code word Voron」を所持している必要があります。</li>
                <li><strong>ZB-1012 (All / アイテム「Note with code word Voron」が必要)</strong>: 工場地帯にある地下への入り口です。こちらも脱出には「Note with code word Voron」が必要です。</li>
                <li><strong>ZB-1013 (PMC / Factory Keyと電源ONが必要)</strong>: 新しいガソリンスタンドの地下にある扉。Factory Keyが必要かつ、工場のレバーで電源を入れる必要があります。</li>
                <li><strong>Trailer Park (PMC)</strong>: マップ西側のトレーラーパークエリアです。</li>
                <li><strong>Boiler Room Basement (Co-op / All)</strong>: 協力脱出などが可能なエリアです。</li>
                <li><strong>Scav専用脱出地点</strong>: Administration Gate, Factory Far Corner, Factory Shacks, Military Base CP, Old Gas Station Gate, Old Road Gate, Passage Between Rocks, Railroad to Military Base, Railroad to Port, Railroad to Tarkov, Scav Checkpoint, Sniper Roadblock, Trailer Park Workers' Shack, Warehouse 17, Warehouse 4 これらはScavプレイ時のみ利用可能です。マップ全域に広く点在しており、PMCとの戦闘を避けやすくなっています。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Factory</strong>: Old Gas Stationの裏手、線路沿いから移動可能。</li>
                <li><strong>To Reserve</strong>: Military Base CP付近から移動可能。</li>
                <li><strong>To Interchange</strong>: Trailer Park / Crossroads方面の道路奥から移動可能。</li>
                <li><strong>To Shoreline</strong>: Admin Gate / Sniper Roadblock付近のエリアから移動可能。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <ul>
                <li><strong>Dorms (寮)</strong>: 3階建てと2階建ての2つの寮があります。特に3階建ての「Marked Room（魔法陣の部屋）」は、専用の鍵が必要ですが、キーツールやドキュメントケース、高級武器などのレアアイテムが湧きます。</li>
                <li><strong>Crackhouse (医療棟)</strong>: インテリジェンス（機密書類）や医療品が豊富です。</li>
                <li><strong>Fortress / Stronghold (要塞)</strong>: 建設中の廃墟。武器パーツ、食料、技術物資が多く湧きます。ボス「Reshala」や、稀に「Goons」が出現する危険地帯でもあります。</li>
                <li><strong>New Gas Station</strong>: ボス「Reshala」のスポーン地点の一つです。カウンター裏や倉庫に武器箱があります。</li>
                <li><strong>Hidden Stashes (隠しスタッシュ)</strong>: マップ全域の草むらや瓦礫の下に、ドラム缶や木の蓋の隠し箱が点在しています。これらを巡るだけでも十分な金策になります。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>川を渡るタイミングを見極める</strong>: マップを横断するには必ず川を渡る必要があります。「メインブリッジ」は見通しが良く危険です。「ランドブリッジ（浅瀬の板）」や「ジャンクブリッジ」など、少しでも隠れられるルートを選びましょう。</li>
                <li><strong>寮（Dorms）には近づかない</strong>: 寮は狭い廊下での接近戦が頻発する激戦区です。タスクがない限り、初心者は近づかないのが無難です。もしタスクで行く場合は、足音を消して慎重に行動しましょう。</li>
                <li><strong>スナイパーScavに注意</strong>: 工場地帯の高い煙突や、検問所の屋上など、高い場所にスナイパーScavが配置されています。見つかると正確な射撃で手足を破壊されるため、彼らの位置を覚え、視線を切って移動しましょう。</li>
            </ul>
        `
    },
    factory: {
        title: 'Factory (ファクトリー)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Factory』は、化学工場とその地下トンネル、オフィスエリアで構成される、タルコフで最も狭いマップです。</p>
            <p>最大の特徴は「プレイヤー間の距離の近さ」です。マッチング時間が短く、スポーン直後数秒で接敵することも珍しくありません。そのため、純粋な撃ち合い（PvP）の練習や、短時間でのスカブ狩りタスクには最適ですが、生存率は極めて低くなる傾向にあります。通称「激戦区」「挽肉機」とも呼ばれ、初心者が装備を失いやすい場所ですが、ここでの戦闘経験は他のマップでの近距離戦に大きく役立ちます。</p>
            <p>ボスの「Tagilla」はハンマーを持って追いかけてくる凶悪な敵で、足音を聞き逃すと致命的です。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は8箇所です。Factory Key（鍵）があると選択肢が広がり生存率が上がります。</p>
            <ul>
                <li><strong>Gate 3 (All)</strong>: マップ北西の隅にある赤い大きな扉の中です。唯一、全プレイヤーが条件なしで利用できる脱出地点ですが、それゆえに最も危険です。脱出部屋の中で待ち伏せしている敵（出待ち）がいる可能性が非常に高いため、必ずグレネードを投げ込むなどしてクリアリングしましょう。</li>
                <li><strong>Gate 0 (PMC / 条件なし)</strong>: 南側の大広間にある大きな赤扉です。Gate 3の対角に位置しており、交戦を避けて帰りたい時に重宝します。</li>
                <li><strong>Cellars (PMC / Factory Keyが必要)</strong>: 地下トンネルの最奥にある扉です。脱出には「Factory Emergency Exit Key」が必要です。利用者が少なく比較的安全です。</li>
                <li><strong>Med Tent Gates (PMC / Factory Keyが必要)</strong>: 医療テント近くのエリアです。こちらも脱出には「Factory Emergency Exit Key」が必要です。</li>
                <li><strong>Courtyard Gate (PMC)</strong>: 中庭エリアにある門です。</li>
                <li><strong>Office Window (Scav)</strong>: 3階オフィスの窓です。Scavプレイ時によく利用されますが、オフィス周辺はPMCが集まりやすいため注意が必要です。</li>
                <li><strong>Camera Bunker Door (Scav)</strong>: 地下のバンカー扉です。</li>
                <li><strong>Smugglers' Passage (All / アイテム「Note with code word Ark」が必要)</strong>: 脱出には特定のアイテム「Note with code word Ark」を所持している必要があります。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Woods</strong>: Gate 3付近または専用の地下通路エリアから移動可能です。</li>
                <li><strong>To Customs</strong>: Gate 0付近、またはオフィス外周から移動可能です。</li>
                <li><strong>To The Lab</strong>: 専用キーカードが必要な場合があるアクセスポイントから移動可能です。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <p>マップが狭いため、マップ自体のルート（漁り）場所は少なめですが、倒したPMCやScavからの装備剥ぎ取りが主な収入源になります。</p>
            <ul>
                <li><strong>Office (3階オフィス)</strong>: 金庫（Safe）とジャケット、引き出しがあります。金策をするならここですが、マップ中のプレイヤーが集まってくる最激戦区です。</li>
                <li><strong>Changing Room (更衣室)</strong>: 鍵が必要な場所もありますが、ロッカーや棚から貴重品が出ることがあります。</li>
                <li><strong>Tagilla (ボス)</strong>: 倒すことができれば、クラス6アーマーや高性能な溶接マスク、重火器を手に入れることができます。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>Factory Keyを入手する</strong>: このマップをPMCでプレイするなら、脱出の選択肢を増やすためにフリーマーケット等でFactory Keyを入手することを強く推奨します。</li>
                <li><strong>スポーンキルに注意する</strong>: 開始直後、隣の部屋や通路の先に敵がいます。「フォークリフト周辺」や「ガラス廊下」は特に危険です。始まった瞬間から戦闘態勢を取りましょう。</li>
                <li><strong>3階オフィスには近づかない</strong>: タスクがない限り、オフィスエリアには近づかないのが無難です。熟練プレイヤーが制圧していることが多く、グレネードが飛び交います。</li>
                <li><strong>足音の上下を聞き分ける</strong>: Factoryは「キャットウォーク（天井の足場）」「地上」「地下トンネル」の3層構造です。足音が聞こえた際、それが自分と同じ高さなのか、上なのか下なのかを判断できるようになると生存率が上がります。</li>
            </ul>
        `
    },
    woods: {
        title: 'Woods (ウッズ)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Woods』は、広大な森林、岩山、湖で構成される自然豊かなマップです。Factoryとは対照的に非常に広いため、敵と遭遇する頻度は低めですが、視界が開けている場所が多く、遠距離からのスナイパー攻撃に常に警戒する必要があります。</p>
            <p>初期タスクが多く設定されているため、初心者が早期に訪れるマップの一つです。しかし、マップの境界線や特定のエリアには「地雷原」が設置されており、マップ知識がないと戦闘せずして死亡することがあります。コンパスやマップツールを活用し、自分がどこにいるかを常に把握することが重要です。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は合計19箇所です。基本的に「マップの東側」に湧いたら「西側の脱出地点」、「西側」に湧いたら「東側の脱出地点」を目指す形になります。</p>
            <ul>
                <li><strong>Outskirts (All)</strong>: マップ南西の端にある古い車付近。西側を目指す際の主要な脱出地点です。目印が少なく迷いやすいため、湖や岩肌をガイドにして進みましょう。</li>
                <li><strong>UN Roadblock (All)</strong>: マップ東側の壁沿いにある検問所。東側を目指す際の主要脱出地点です。</li>
                <li><strong>Northern UN Roadblock (PMC)</strong>: UN Roadblockのさらに北にある検問所です。</li>
                <li><strong>Bridge V-Ex (PMC / 有料・車)</strong>: マップ北東の村（Village）の北にある橋の黒いSUV。利用にはルーブルが必要です。</li>
                <li><strong>RUAF Gate (PMC / 緑煙が出ている時のみ)</strong>: マップ南東の工場地帯近く。緑色の煙が出ている時のみ使用可能です。</li>
                <li><strong>RUAF Roadblock (Scav / 緑煙が出ている時のみ)</strong>: RUAF Gateと同様のエリアですが、Scav用の判定エリアがあります。</li>
                <li><strong>Power Line Passage (PMC / 緑フレアが必要)</strong>: 緑色の信号弾（Green Flare）が必要です。</li>
                <li><strong>ZB-014 (PMC / 鍵と緑煙が必要)</strong>: マップ西側の森の中にある地下バンカー。施錠されているため専用の鍵が必要であり、かつ緑色の煙が出ている時のみ使用可能です。</li>
                <li><strong>ZB-016 (PMC / 緑煙が必要)</strong>: マップ中央付近の森の中にある地下バンカー。緑色の煙が出ている時のみ使用可能です。場所が草木に覆われており見つけにくいです。</li>
                <li><strong>Factory Gate (Co-op / PMC+Scav協力)</strong>: PMCとScavが協力して脱出する必要があります。</li>
                <li><strong>Friendship Bridge (Co-op / All)</strong>: 協力脱出が可能なエリアです。</li>
                <li><strong>Scav専用脱出地点</strong>: Dead Man's Place, Eastern Rocks, Mountain Stash, Old Railway Depot, Old Station, Scav Bunker, Scav House, The Boat これらはScavプレイ時のみ利用可能です。特にMountain StashやScav House周辺は広いため、脱出判定が出るまで動き回りましょう。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Reserve</strong>: RUAF RoadblockまたはUN Roadblock付近から移動可能。</li>
                <li><strong>To Customs</strong>: UN Roadblock / Factory Gateエリア付近から移動可能。</li>
                <li><strong>To Factory</strong>: Outskirtsとは逆側のエリア（ZB-014付近等）から移動可能。</li>
                <li><strong>To Lighthouse</strong>: Northern UN Roadblockのさらに奥、または山道から移動可能。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <ul>
                <li><strong>Sawmill (製材所)</strong>: マップ中央にある最大の激戦区。ボス「Shturman」とその護衛が湧きます。彼らは高性能なスナイパーライフルを持っています。また、中央の倉庫にある「Common fund stash（Shturmanの鍵が必要）」からは、Red Rebelなどの最高級アイテムが出る可能性があります。</li>
                <li><strong>USEC Camp</strong>: マップ北西の地雷原近くにあるキャンプ。武器パーツ、貴重品、医療品が豊富です。アクセスしやすいため人気があります。</li>
                <li><strong>Forward Operating Base (FOB/軍事キャンプ)</strong>: マップ南東にある大きな医療キャンプ。大量の医療品、食料、武器パーツが手に入ります。Scavが多く湧く場所でもあります。</li>
                <li><strong>Violet Keycard</strong>: 製材所の小屋、検問所のSUV、黒いSUVの座席など、数箇所にラボ用の「バイオレットキーカード（超高額）」のスポーンポイントがあります。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>地雷原の看板を見逃さない</strong>: マップの端やUSECキャンプの裏手には地雷原があります。ドクロマークの看板を見たら、絶対にその先へ進まないでください。踏むと足が破壊され、2発目で死亡します。</li>
                <li><strong>開けた場所を走らない</strong>: 製材所周辺や広い平原は、スナイパーの格好の餌食です。移動する際は、木々の間を縫うように歩き、稜線（山の頂点）を歩かないようにしましょう。</li>
                <li><strong>狙撃されたら走って隠れる</strong>: パンッという銃声の後に着弾音が聞こえたら、遠距離から狙われています。その場で伏せるのは自殺行為です。ジグザグに走って、最も近い木や岩の裏に隠れてください。</li>
            </ul>
        `
    },
    reserve: {
        title: 'Reserve (リザーブ)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Reserve』は、連邦政府物資予備局の秘密基地を舞台としたマップです。地上にはヘリポートや車両整備所、宿舎が並び、地下には広大なバンカーとトンネル網が張り巡らされています。</p>
            <p>最大の特徴は「脱出の難易度」です。脱出地点は多いものの、そのほとんどに「電源を入れる」「バックパックを捨てる」「特殊な装備が必要」などの厳しい条件が課されています。また、高性能な装備を持つNPC「レイダー（Raider）」や、重武装のボス「Glukhar」率いる部隊が出現するため、戦闘強度は非常に高いです。</p>
            <p>マップ中央を見下ろすドームからの狙撃や、地下での至近距離戦闘など、あらゆる距離での戦闘能力が試されます。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は合計11箇所です。条件なしで帰れる場所がほとんどないため、事前に計画を立てる必要があります。</p>
            <ul>
                <li><strong>Cliff Descent (PMC / Red Rebelとパラコード必要、アーマー不可)</strong>: ドーム裏手の崖です。近接武器「Red Rebel Ice Pick」と「Paracord」を所持し、かつアーマーリグを装備していない状態でのみ使用可能です。最も安全で人気のある脱出方法です。</li>
                <li><strong>D-2 (PMC / 地下電源ONが必要)</strong>: 地下バンカーの最奥にある気密扉です。メインルームの電源レバーを入れた後、ボタンスイッチを押して扉を開ける必要があります。レイダーが出現する可能性があり、かつ有名な出待ちスポットでもあるため、クリアリングは必須です。</li>
                <li><strong>Bunker Hermetic Door (All / レバーでサイレン起動中のみ)</strong>: 地下食料庫近くの巨大な扉です。マップ各所にあるレバーを引いてサイレンが鳴っている間（一定時間）のみ脱出可能です。サイレンが鳴るとプレイヤーやレイダーが集まってくるため激戦になります。</li>
                <li><strong>Armored Train (All / 到着後に出発する列車)</strong>: レイド後半に駅へ到着する装甲列車です。到着して数分後に発車し、その際に中に乗っていれば脱出できます。発車直前は他のプレイヤーやレイダーとの大混戦になります。</li>
                <li><strong>Sewer Manhole (All / バックパック不可)</strong>: 整備所近くのマンホールです。バックパックを装備していない状態でのみ使用可能です。大きな戦利品は持ち帰れませんが、比較的安全に離脱できます。</li>
                <li><strong>Scav Lands (Co-op / PMC+Scav協力)</strong>: PMCとScavが協力して脱出する必要があります。</li>
                <li><strong>Exit to Woods (All / アイテム「Minefield map (Reserve)」が必要)</strong>: 脱出には特定のアイテム「Minefield map (Reserve)」を所持している必要があります。</li>
                <li><strong>Scav専用脱出地点</strong>: Checkpoint Fence, Depot Hermetic Door, Heating Pipe, Hole in the Fence by the Mountains Scavであれば、Heating PipeやHole in the Fenceなどが比較的安全に利用できます。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Customs</strong>: 線路沿い、列車の操車場北側から移動可能。</li>
                <li><strong>To Woods</strong>: マップ端のフィールドエリア（Scav Lands方面奥）から移動可能。</li>
                <li><strong>To Lighthouse</strong>: Armored Trainエリアの奥、線路の延長線上から移動可能。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <p>軍事基地であるため、弾薬、武器パーツ、軍事技術品（インテリジェンス、戦車バッテリー等）が豊富です。</p>
            <ul>
                <li><strong>King (司令部サーバー棟)</strong>: 高級な軍事電子機器（Virtex, VPXなど）やインテリジェンスが湧きます。</li>
                <li><strong>Drop Down Room (校舎)</strong>: 「Black Bishop」建物の3階にある部屋からは、グラフィックボードやテトリスなどの電子機器が見つかります。飛び降りて入る必要があるためこの名で呼ばれます。</li>
                <li><strong>Marked Rooms</strong>: Reserveには複数の魔法陣部屋（RB-BK, RB-VOなど）があり、キーツールやケース類が狙えます。</li>
                <li><strong>Raiders/Glukhar</strong>: 彼らを倒せば、フルカスタムされた武器や高クラスアーマーが入手できます。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>地下と地上の位置関係を把握する</strong>: Reserveは地下移動を使いこなすと生存率が上がります。地上を走るよりも、地下トンネルを通って目的地へ近づくルートを覚えましょう。</li>
                <li><strong>脱出プランを事前に決める</strong>: 「Red Rebel」を持っていない場合、脱出は困難を極めます。「マンホール脱出で小物を稼ぐ」か、「D-2で激戦を覚悟するか」など、装備に合わせて目的を絞りましょう。</li>
                <li><strong>サイレンが鳴ったら警戒する</strong>: 誰かが脱出レバーを引くと、マップ全体に大音量のサイレンが響き渡ります。これは「Bunker Hermetic Door」が開いた合図であると同時に、レイダーがスポーンした可能性を示唆しています。</li>
            </ul>
        `
    },
    lighthouse: {
        title: 'Lighthouse (ライトハウス)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Lighthouse』は、灯台へと続く海岸線と山岳地帯、そして浄水場（Water Treatment Plant）を舞台とした縦に長いマップです。</p>
            <p>最大の特徴は、浄水場を占拠している敵対勢力「ローグ（Rogue）」の存在です。彼らは固定機銃やグレネードランチャーで武装しており、遠距離から正確無比な攻撃を仕掛けてきます。PMCの所属（USECかBEARか）によって敵対反応距離が異なりますが、基本的に不用意に近づけば即死します。</p>
            <p>マップは「別荘地帯」「浄水場」「灯台エリア」に分かれており、高額な貴重品や軍事技術品が大量に湧くため、金策効率は非常に高いです。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は合計12箇所です。</p>
            <ul>
                <li><strong>Southern Road (PMC / 基本常時)</strong>: マップ南端の海岸沿いにある道路。多くのスポーン地点からアクセスしやすく、条件もないため最も利用される脱出地点の一つです。</li>
                <li><strong>Northern Checkpoint (PMC)</strong>: マップ北西の道路の突き当たり。浄水場の近くにあるため、ローグや他のPMCとの戦闘リスクがあります。</li>
                <li><strong>Path to Shoreline (All)</strong>: マップ東側の山岳地帯にある集落跡付近。比較的安全に脱出できます。</li>
                <li><strong>Mountain Pass (PMC / Red Rebelとパラコード必要、アーマー不可)</strong>: 山頂付近にある脱出地点。近接武器「Red Rebel」と「Paracord」が必要で、アーマーリグを装備していない状態でのみ利用可能です。浄水場を漁った後の帰還ルートとして優秀です。</li>
                <li><strong>Road to Military Base V-Ex (PMC / 有料・車)</strong>: マップ東側の工業地帯裏にある黒いSUV。ルーブルが必要です。</li>
                <li><strong>Passage by the Lake (All / アイテム「Minefield map (Lighthouse)」が必要)</strong>: 脱出には特定のアイテム「Minefield map (Lighthouse)」を所持している必要があります。</li>
                <li><strong>Armored Train (All / 到着後に出発する列車)</strong>: 浄水場内部の駅に到着する列車です。ローグの制圧が必要なため難易度は高いです。</li>
                <li><strong>Side Tunnel (Co-op / PMC+Scav協力)</strong>: PMCとScavが協力して脱出する必要があります。</li>
                <li><strong>Scav専用脱出地点</strong>: Hideout under the Landing Stage, Industrial Zone Gates, Scav Hideout at the Grotto, Southern Road Landslide 特に「Grotto」や「Industrial Zone Gates」は浄水場でアイテムを回収したScavにとって便利な位置にあります。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Shoreline</strong>: Path to Shoreline脱出地点のすぐ近くから移動可能。</li>
                <li><strong>To Reserve</strong>: Road to Military Base方面の道路奥から移動可能。</li>
                <li><strong>To Woods</strong>: Northern Checkpoint方面の山道エリアから移動可能。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <ul>
                <li><strong>Water Treatment Plant (浄水場)</strong>: ローグが守るエリア。倒したローグからの装備剥ぎ取りが美味しいほか、倉庫内には貴重品、軍事品、武器パーツが大量にあります。</li>
                <li><strong>Chalets (別荘地帯)</strong>: 山の中腹にある2つの豪華な別荘。ここには「Virtex」「VPX」「AESA」などの超高額テックアイテムや、ビットコインなどの貴重品が直湧きします。鍵がなくても美味しいアイテムが拾えるため、PMC同士の激戦区です。</li>
                <li><strong>Lighthouse (灯台)</strong>: マップ南の半島にある灯台エリア。ボス「Zryachiy」がスナイパーライフルで守っており、専用のアイテムを持っていないと近づくことすらできません。内部には高額品があります。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>ローグの射線を理解する</strong>: 浄水場のローグは、数百メートル離れていても固定機銃を撃ってきます。マップツール等で「どこが射線に入っているか」を確認し、絶対に身体を晒さないルートを選びましょう。</li>
                <li><strong>地雷に注意する</strong>: 浄水場の外壁周辺や、特定の岩場には地雷が設置されています。知らずに踏み込むと即死するため、正規の入り口以外からの侵入はマップ知識が必要です。</li>
                <li><strong>プレイヤーScavの多さ</strong>: Lighthouseはアイテムが美味しいため、プレイヤーScavに大人気です。レイド開始10分後くらいから大量に湧いてくるため、長居すると囲まれて危険です。</li>
            </ul>
        `
    },
    shoreline: {
        title: 'Shoreline (ショアライン)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Shoreline』は、海岸線、村落、そして中央にそびえ立つ巨大な保養所（Health Resort）で構成される広大なマップです。</p>
            <p>このマップは二つの顔を持っています。一つは外周部での「中～遠距離戦」です。森や丘陵地帯が多く、視界が開けているためスナイパー同士の撃ち合いが発生します。もう一つは、マップ中央の保養所での「超至近距離戦」です。高額アイテムが密集する保養所内では、重装備のPMCたちが狭い廊下で激しく衝突します。</p>
            <p>ボスの「Sanitar」は保養所、港（Pier）、コテージのいずれかに出現し、非常に高い耐久力と正確な射撃を行ってくるため、不用意に接近は危険です。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は合計13箇所です。マップの「東側（Road to Customs側）」に湧いた場合は「西側（Tunnel側）」へ、「西側」に湧いた場合は「東側」へ向かうのが基本ルートです。</p>
            <ul>
                <li><strong>Tunnel (PMC)</strong>: マップ南西の端、トンネルの入り口です。崩落しているため通り抜けはできず、その手前が脱出地点となります。主要な脱出ルートであり、トンネル上の丘からの出待ちに注意が必要です。</li>
                <li><strong>Road to Customs (All)</strong>: マップ北東の端、大きな鉄のゲート付近です。こちらも主要な脱出地点であり、付近には隠しスタッシュも多いためScavプレイヤーもよく訪れます。</li>
                <li><strong>Path to Lighthouse (All)</strong>: マップ北西の湿地帯エリアにある看板付近です。比較的安全にアクセスしやすく、利用頻度の高い脱出地点です。</li>
                <li><strong>Pier Boat (PMC / 緑煙が出ている時のみ)</strong>: マップ南部の港（Pier）にあるボートです。桟橋の先端にあり、緑色の煙が出ている時のみ使用可能です。一本道であるため、敵に見られていると逃げ場がなく非常に危険です。</li>
                <li><strong>Railway Bridge (PMC)</strong>: マップ西側の川にかかる鉄道橋の下ではなく、その近くの線路エリアです。</li>
                <li><strong>Road to North V-Ex (PMC / 有料・車)</strong>: マップ北側の壁沿いにある黒いSUV。ルーブルが必要です。</li>
                <li><strong>Climber's Trail (PMC / Red Rebelとパラコード必要、アーマー不可)</strong>: 保養所の裏手、山側の崖にある脱出地点です。近接武器「Red Rebel」と「Paracord」が必要で、アーマーリグを装備していない状態でのみ利用可能です。保養所で戦った後の迅速な離脱ルートとして重宝されます。</li>
                <li><strong>Mountain Bunker (All / アイテム「Note with code word Heartbeat」が必要)</strong>: 脱出には特定のアイテム「Note with code word Heartbeat」を所持している必要があります。</li>
                <li><strong>Smugglers' Path (Co-op / PMC+Scav協力)</strong>: PMCとScavが協力して脱出する必要があります。</li>
                <li><strong>Scav専用脱出地点</strong>: Admin Basement, East Wing Gym Entrance, Lighthouse, Ruined Road 保養所の地下やジム入口など、激戦区のど真ん中から帰還できるルートが用意されています。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Lighthouse</strong>: Path to Lighthouse脱出地点付近から移動可能。</li>
                <li><strong>To Terminal</strong>: 22:00～04:00の間のみ使用可能。</li>
                <li><strong>To The Labyrinth</strong>: Health Resort（保養所）西棟地下から進入可能。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <ul>
                <li><strong>Health Resort (保養所)</strong>: 「LEDX」や「GPU」、高額な鍵（Red Keycard、Blue Keycard等）が湧く、タルコフ屈指のトレジャーハンティングスポットです。特に「東棟222/226号室」「西棟301号室」などは有名です。</li>
                <li><strong>Cottages (コテージ)</strong>: 鍵が必要な別荘と、鍵不要の別荘があります。金庫やPCがあり、Sanitarのスポーン地点でもあります。</li>
                <li><strong>Pier (港)</strong>: 事務所の建物には金庫が2つとPC、引き出しがあります。一本道なので袋小路になりやすいリスクがあります。</li>
                <li><strong>Hidden Stashes</strong>: マップの外周や村には大量の隠しスタッシュが埋まっており、これらを巡るだけでも十分な稼ぎになります。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>保養所に行くかどうか決める</strong>: 保養所はハイリスク・ハイリターンです。タスクがない、あるいは装備に自信がない場合は、外周の隠しスタッシュ巡りやScav狩りに徹するのが安全です。</li>
                <li><strong>開けた場所での移動</strong>: 海岸沿いや平原はスナイパーの射線が通ります。常に「撃たれたらどこに隠れるか」を意識し、スタミナ管理を怠らないようにしましょう。</li>
                <li><strong>音を聞く</strong>: 保養所内では、敵が上の階にいるのか下の階にいるのか、足音の聞き分けが生死を分けます。</li>
            </ul>
        `
    },
    the_lab: {
        title: 'The Lab (ラボ)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『The Lab』は、タルコフ市地下に存在するTerraGroupの秘密研究所です。</p>
            <p>このマップに出撃するには、使い捨ての「TerraGroup Labs access keycard」が必要です（練習モードを除く）。</p>
            <p>最大の特徴は、「保険が効かない」ことです。死亡した場合、どれだけ保険を掛けていても装備は一切戻ってきません。敵は通常のScavはおらず、代わりに高装備・高AIの「レイダー（Raider）」が巡回しています。</p>
            <p>リスクは最大級ですが、マップ内に落ちているアイテムはLEDX、GPU、インテリジェンス、各種興奮剤など最高級品ばかりです。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は7箇所です。そのほとんどが、マップ内の電源を入れたりハッキングを行うことで開放されますが、その際にアナウンスが流れ、レイダーが出現するトリガーとなります。</p>
            <ul>
                <li><strong>Cargo Elevator (PMC / 地下のルームG1の電源パネルを操作)</strong>: 貨物用エレベーターです。地下エリアで電源を入れると利用可能になります。</li>
                <li><strong>Medical Block Elevator (PMC / 地下のルームG6の電源パネルを操作)</strong>: 医療ブロック近くのエレベーターです。こちらも電源操作が必要です。</li>
                <li><strong>Main Elevator (PMC / ルームR4の近くにある電源パネルを操作)</strong>: メインロビー近くのエレベーターです。</li>
                <li><strong>Hangar Gate (PMC / 二階のルームB24のコントロールパネルを操作)</strong>: 格納庫のゲートです。シャッターが開くのに時間がかかり、開放中は大きな音が鳴るため敵が集まってきやすいです。</li>
                <li><strong>Parking Gate (PMC / 二階のルームY21のコントロールパネルを操作)</strong>: 駐車場のゲートです。こちらも開放時に大きな音が鳴り、レイダーを呼び寄せる危険な脱出地点です。</li>
                <li><strong>Sewage Conduit (PMC / 排水操作が必要)</strong>: 地下の水路エリアです。部屋に入って正面左側のパネルを操作し、排水が完了するのを待つ必要があります。時間がかかりますが、比較的目立ちにくい場所です。</li>
                <li><strong>Ventilation Shaft (PMC / バックパック不可)</strong>: 換気ダクトです。バックパックを装備していない状態でのみ使用可能です。サイズ制限はありますが、電源操作などが不要で最も隠密に脱出できます。</li>
            </ul>

            <h3>トランジット (Transits)</h3>
            <ul>
                <li><strong>To Streets of Tarkov</strong>: マップ内の特定箇所から移動可能です。</li>
            </ul>

            <h3>レアアイテム・湧き場所の傾向</h3>
            <ul>
                <li><strong>Keycard Rooms</strong>: 「Red」「Green」「Blue」「Black」「Violet」「Yellow」のカードキーで開く部屋には、それぞれの色に対応した最高級の医療品、武器、アイテムが湧きます。特にBlack Roomは興奮剤（Stimulator）の宝庫です。</li>
                <li><strong>Central Area</strong>: マップ中央の作業エリアには、LEDXやGPUが机の上に直湧きしていることがあります。</li>
            </ul>

            <h3>初心者向け立ち回りアドバイス</h3>
            <ul>
                <li><strong>ラボは「エンドコンテンツ」</strong>: 装備、知識、エイム力、資金力の全てが求められます。初心者が安易に行くと一瞬で資産を失います。オフラインモードで十分にマップとレイダーの挙動を練習してから挑みましょう。</li>
                <li><strong>レイド時間をフルに使わない</strong>: 時間が経つにつれてプレイヤー同士の戦闘は激化し、強豪プレイヤーが生き残ります。目的のアイテムを拾ったら、バックパックを捨ててVentilation Shaftから即離脱するのも賢い戦略です。</li>
            </ul>
        `
    },
    the_labyrinth: {
        title: 'The Labyrinth (ラビリンス)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『The Labyrinth』は、その名の通り複雑な構造を持つ特殊なエリアです。詳細は多くの謎に包まれていますが、Shorelineの地下からアクセスできる深層エリアとして位置づけられています。閉鎖的で圧迫感のある空間であり、迷路のような通路がプレイヤーを惑わせます。</p>
            <p>進入はShorelineのWest Wing（西棟）地下からトランジットで行います。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は2箇所のみ確認されています。</p>
            <ul>
                <li><strong>Ariadne's Path (「Ariadne symbol key」が必要)</strong>: 脱出には特定の鍵「Ariadne symbol key」が必要です。ギリシャ神話のアリアドネの糸にちなんだ名称であり、迷宮からの脱出を意味します。</li>
                <li><strong>The Way Up (開始15分後から利用可能)</strong>: 条件として、レイド開始（またはエリア進入）から15分が経過していないと利用できません。一定時間の生存を強いられるため、持久戦の準備が必要です。</li>
            </ul>
        `
    },
    terminal: {
        title: 'Terminal (ターミナル)',
        content: `
            <h2>マップ概要・特徴</h2>
            <p>『Terminal』は、タルコフからの最終的な脱出、あるいは物語の核心に迫るための重要なエリアです。港湾施設のような構造をしており、多数のコンテナや積み荷が配置されています。ここでの目的は単なる生存や略奪を超え、ストーリータスクに関連した重要な任務を遂行することにあります。</p>
            <p>ストーリータスクを進めることで、マップ南東部の港湾駐屯地のインターホンでアクセス アイテムを提示した後、22:00 から 4:00 の時間帯にShorelineから移動して進入（トランジット）可能になります。特定の条件を満たしたプレイヤーのみが足を踏み入れることができる場所です。</p>
            
            <h3>脱出地点の解説 (Extractions)</h3>
            <p>脱出地点は1箇所のみという極めて過酷な仕様です。</p>
            <ul>
                <li><strong>Zubr Boat (特殊条件あり)</strong>: このボートで脱出するためには、タスクアイテムの「Secure container Alpha-1 with TerraGroup evidence」を持ち込んだプレイヤーは、それを携帯する必要があります。 さらに、プレイヤーが桟橋に到着すると「3分間の抽出タイマー」が開始されます。この3分間、敵の攻撃や他プレイヤーからの妨害に耐え抜き、生存していなければなりません。タルコフ屈指の緊張感を強いられる脱出地点です。</li>
            </ul>
        `
    }
};
