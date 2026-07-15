// vision/home-lighting/home-lighting-content.js developed by Bob Tianqi Wei
(function () {
  function paragraph(text) {
    return { type: "paragraph", text: text };
  }

  function heading(text) {
    return { type: "heading", text: text };
  }

  function subheading(text) {
    return { type: "subheading", text: text };
  }

  function quote(text) {
    return { type: "quote", text: text };
  }

  function list(items, ordered) {
    return { type: "list", items: items, ordered: Boolean(ordered) };
  }

  function images(items, caption) {
    return { type: "images", items: items, caption: caption };
  }

  var englishBlocks = [
    paragraph("My undergraduate thesis project was about lighting. Earlier this year, I left a comment under a post on Xiaohongshu (a Chinese social platform) that went viral. The first line was:"),
    quote("First, turn off that ceiling light."),
    paragraph("That's kind of an absolute statement. Ceiling lights are fine to use. They're good for cleaning, finding things, or when you need a lot of brightness. The problem is that many homes rely on just one light in the center of the room, trying to evenly light everything. That kind of light lets you see the space, but it doesn't adapt well to reading, working, resting, or winding down before bed, and it makes it hard for a space to have any sense of depth."),
    paragraph("Good home lighting needs to consider three things at once: what people are doing in this space, what state the body is in at that point in the day, and how the eye should naturally travel through the room."),
    images([
      { src: "/images/home-lighting-cover.jpg?v=20260715", alt: "The room in the Evening lighting scene" }
    ], "My home at NEMA in San Francisco, 2025–2026. Lighting set to the Evening scene."),

    heading("1. Think About Function First, Fixtures Second"),
    paragraph("When I design lighting, I don't start by asking what fixtures to buy. I start by asking: what is someone doing in this spot?"),
    paragraph("A desk needs to support work and reading. A bedside area needs to support reading, resting, and pre-sleep routines. Storage areas need to make it easy to spot things. Plants and artwork can become areas you simply enjoy looking at. Different activities call for different levels of brightness, direction, and coverage."),
    paragraph("The German lighting resource licht.de divides home lighting into three layers:"),
    paragraph("<strong>Ambient lighting</strong> provides basic brightness so you can make out the space and find your way around. A floor lamp that shines up toward the ceiling is a great example of ambient light. The light softens as it bounces off the walls or ceiling, and ends up covering a wider area."),
    paragraph("<strong>Task lighting</strong> supports specific activities, like a desk lamp, a reading light, a light over the dining table, or a light that illuminates a storage cabinet. It should land precisely where it's needed."),
    paragraph("<strong>Accent lighting</strong> is mostly about mood and creating a visual focal point, like a small floor light, a light by the window, or a decorative light. It doesn't need to light up the whole room, just make one spot appealing."),
    paragraph("A room usually needs several light sources working together. Lights placed at different spots, angles, and brightness levels can divide a room into reading, working, and resting zones, and also soften harsh contrasts between light and dark."),
    images([
      { src: "/images/home-lighting/ceiling-light-only.jpg", alt: "A room lit only by a ceiling light" },
      { src: "/images/home-lighting/layered-lighting.jpg", alt: "The same room with layered lighting" }
    ], "Ceiling light only · Layered lighting"),

    heading("2. Comfortable Light Starts With Avoiding Glare"),
    paragraph("Whether a light works well isn't just about brightness. You also need to notice whether the light source hits your eyes directly, and whether it reflects off screens, glass, or shiny furniture."),
    paragraph("Glare usually comes from a light source that's too bright relative to your field of view, especially in a dim room, where a bare bulb can feel especially harsh. Spending long periods in that kind of environment can lead to eye strain, stress, and trouble concentrating."),
    paragraph("A few simple fixes:"),
    list([
      "Point light toward walls, ceilings, or desktops instead of straight at eye level.",
      "Use lampshades, frosted covers, or indirect lighting to hide bright points of light.",
      "Keep bright desk lamps out of your monitor's reflection.",
      "Keep some ambient light on so there isn't too much contrast between your screen, your work area, and the rest of the room."
    ]),
    paragraph("Lighting that's too even makes a room feel flat; too much contrast forces your eyes to keep adjusting. A comfortable space needs some variation between light and dark, along with overall balance."),
    images([
      { src: "/images/home-lighting/desk-without-glare.jpg", alt: "A desk lit without a visible source of glare" }
    ], "Ambient light behind the screen keeps bright light sources out of view."),

    heading("3. Light Also Tells the Body What Time It Is"),
    paragraph("Light helps us see things, but it also plays a role in regulating our internal body clock."),
    paragraph("During the day, brighter light, covering a larger area, with more short-wavelength content, tends to boost alertness. At night, lowering the brightness and reducing short-wavelength content helps the body gradually settle into rest. How light affects the body depends on brightness, spectrum, direction, surface area, timing, and duration, not just color temperature."),
    paragraph("So the idea that \"cool light always makes you tired\" isn't quite accurate. Eye fatigue is often more closely tied to glare, excessive contrast, flicker, and long hours of screen use. That said, using bright, cool-toned light late at night really can keep you more alert, making it harder to transition from work mode into rest mode."),
    paragraph("I let the lighting in my home shift over the course of the day: bright in the daytime, warm in the evening, very dim before bed. This mirrors the natural rhythm of daylight fading into night, and lets the room serve different purposes at different times."),

    heading("4. Treat Light Like a Visual Composition"),
    paragraph("In that Xiaohongshu comment, I mentioned \"visual hierarchy\" and \"asymmetric balance.\" These are concepts from graphic design, and they apply just as well to lighting."),
    paragraph("Graphic design exercises often involve arranging gray squares of different sizes and shades on a white background. You can flip that idea around for nighttime home lighting: the room becomes a dark background, and different light sources paint bright shapes of varying size, brightness, and position within it."),
    paragraph("The brightest area, or the one with the strongest contrast, or the one in the most distinctive spot, tends to catch the eye first. A second, slightly less bright area becomes a secondary focal point, and everything else becomes background and negative space."),
    paragraph("If everything is equally bright, the room loses any sense of hierarchy. If every light is small, warm, and dim, you can end up with a disorganized pile of mood lighting. A better approach is to combine:"),
    list([
      "One large area of soft ambient light",
      "One or two clear task lights",
      "A small number of accent lights that draw the eye",
      "Some quiet dark areas"
    ]),
    paragraph("Balance doesn't have to be symmetrical. For example, if the left side of your view has a large but softly lit area, you can balance it with a smaller but slightly brighter light on the right. The two sides don't need to match, they just need similar visual weight."),
    paragraph("In my own room, the light on the plants by the window acts as an accent light. At night, it draws the eye naturally across the room toward the plants and the window, making the space feel visually extended."),
    images([
      { src: "/images/home-lighting/plants-as-focal-point.jpg", alt: "Illuminated plants forming a focal point near the window" }
    ], "The illuminated plants draw the eye toward the window."),

    heading("5. Lighting Design Also Depends on the Surfaces Being Lit"),
    paragraph("Light ultimately lands on walls, floors, furniture, fabric, plants, and skin. So the lamp itself is only half the design, the other half comes from materials."),
    paragraph("The same light will look completely different on a white wall, a yellow rug, and a black rug."),
    paragraph("White walls reflect a lot of light, so they can turn even a small light source into a large, soft area of ambient light. A yellow rug will make reflected light feel warmer. A black rug absorbs a lot of light, which can create a more stable dark area, but it can also make the whole space feel dimmer."),
    paragraph("The finish of a surface matters too. Matte materials scatter light fairly evenly; glass, metal, and glossy black furniture can create very bright, localized reflections. Even a dark-colored object can produce glare if it has a mirror-like surface."),
    paragraph("How bright a surface appears to us depends both on the light hitting it and on how well that surface reflects light. That means lighting design has to be considered together with the colors and materials in a room."),
    images([
      { src: "/images/home-lighting/white-wall.jpg", alt: "Light reflected from a white wall" },
      { src: "/images/home-lighting/yellow-rug.jpg", alt: "Light reflected from a yellow rug" },
      { src: "/images/home-lighting/black-rug.jpg", alt: "Light absorbed by a black rug" }
    ], "White wall · Yellow rug · Black rug"),

    heading("6. Use Smart Home Tech to Save Different States of Living"),
    paragraph("When a room has a lot of lights, adjusting each one individually gets tedious fast. I've connected most of my lights to Apple Home and saved three main scenes."),
    subheading("Daytime"),
    paragraph("The Daytime scene brings everything up to higher brightness. A large floor lamp in the corner shines up at the ceiling, providing broad ambient light; the light behind my monitor and the bedside light also turn on."),
    paragraph("This scene works well for working, tidying up, or supplementing natural light on a cloudy day. The goal is to keep the whole space clear and bright, and to reduce the contrast between the work area and its surroundings."),
    subheading("Evening"),
    paragraph("In the evening, I lower the overall brightness and shift the light warmer. I mainly keep a few small warm lights on the floor, the lamp lighting the window-side plants, and a dimmed version of the monitor-back light and bedside light."),
    paragraph("The plants become the visual focal point in this scene. The other lights balance out the composition and provide basic orientation. The room still has a clear sense of layers, but it no longer carries the tension of daytime mode."),
    subheading("Before Sleeping"),
    paragraph("Before bed, I keep only two lights on, behind the monitor and by the bed, dimmed way down and switched to red. That's just enough to make out my surroundings, without creating any harsh bright spots."),
    paragraph("Red light doesn't have some magical sleep-inducing power, but at very low brightness, it tends to contain less short-wavelength light, which can somewhat reduce nighttime light's stimulating effect. At this point, the screen brightness should come down too."),
    paragraph("The value of saved scenes isn't just convenience. It turns the day's work, relaxation, and wind-down into distinct states of the space. Lighting control systems are well suited for exactly this, using presets to quickly adjust brightness, distribution, and color temperature for different activities."),
    images([
      { src: "/images/home-lighting/daytime.jpg", alt: "The Daytime lighting scene" },
      { src: "/images/home-lighting-cover.jpg?v=20260715", alt: "The Evening lighting scene" },
      { src: "/images/home-lighting/before-sleeping.jpg", alt: "The Before Sleeping lighting scene" }
    ], "Daytime · Evening · Before Sleeping"),

    heading("7. A Simple Method for Designing Your Own Home Lighting"),
    paragraph("Here's a five-step starting point for designing your own home lighting:"),
    list([
      "Write down the main activities that happen in the room: working, reading, eating, storing things, resting.",
      "Set up a well-placed task light for each activity.",
      "Add ambient light aimed at the walls or ceiling, so the room doesn't end up with just a few isolated bright spots.",
      "Pick one or two areas you want people to notice first, and use accent lighting to build a visual hierarchy.",
      "Check for glare, reflections, furniture color, and materials, then save your regular setups as different scenes."
    ], true),
    paragraph("Buying more lights doesn't automatically make lighting better. What actually matters is what job each light is doing, what surface it's lighting up, and what kind of order it forms together with the other light sources in the room."),
    paragraph("Good home lighting usually doesn't ask you to notice the lights themselves. It lets work happen naturally, lets the body sense the time of day, and lets the eye find its own path through the space. When a space truly serves what people are doing in it, it tends to look good too, almost on its own.")
  ];

  var chineseBlocks = [
    paragraph("我本科毕业设计研究的是照明。今年早些时候，我在一条小红书笔记下面留的一段关于照明的评论火了，第一句是："),
    quote("首先把那个顶灯关了。"),
    paragraph("这句话有点儿绝对。顶灯当然可以用，在打扫房间、寻找物品或需要高亮度时，它很方便。问题在于，很多家庭只用一盏位于房间中央的灯，试图平均照亮所有东西。这样的光可以让人看清空间，却很难适应阅读、工作、休息和睡前活动，也很难让空间产生层次。"),
    paragraph("好的家庭照明，需要同时考虑三件事：人在这里做什么，身体在一天中的什么状态，以及目光应该如何经过这个空间。"),
    images([
      { src: "/images/home-lighting-cover.jpg?v=20260715", alt: "使用 Evening 灯光场景的房间" }
    ], "我在旧金山 NEMA 公寓的家，2025–2026。照明设置为 Evening 场景。"),

    heading("一、先考虑功能，再考虑灯具"),
    paragraph("设计照明时，我首先不会问应该买什么灯，而会问：人在这个位置准备做什么？"),
    paragraph("电脑桌需要支持工作和阅读；床边需要支持阅读、休息和睡前活动；收纳区需要让人轻松辨认物品；植物和艺术品则可以成为观赏区域。不同活动需要不同的亮度、方向和照明范围。"),
    paragraph("德国照明知识平台 licht.de 将家庭照明分为三层："),
    paragraph("<strong>背景照明</strong>提供基本亮度，帮助人辨认空间和行走方向。向天花板照射的落地灯就是一种很好的背景光。光线经过墙面或天花板反射后，会变得柔和，并照亮更大的区域。"),
    paragraph("<strong>区域照明</strong>服务具体活动，例如桌灯、阅读灯、餐桌吊灯或照亮储物柜的灯。它应该准确地照在需要的位置。"),
    paragraph("<strong>氛围照明</strong>主要负责营造感受和建立视觉焦点，例如地面上的小灯、窗边灯或装饰灯。它不需要照亮整个空间，只需要让某个局部产生吸引力。"),
    paragraph("一个房间通常需要多种光源共同工作。不同位置、方向和亮度的光，能够划分阅读、工作和休息区域，也能减少过大的明暗反差。"),
    images([
      { src: "/images/home-lighting/ceiling-light-only.jpg", alt: "只开顶灯的房间" },
      { src: "/images/home-lighting/layered-lighting.jpg", alt: "使用多层照明的同一房间" }
    ], "只开顶灯 · 多层照明"),

    heading("二、让光线舒服，首先要避免眩光"),
    paragraph("判断一盏灯是否合适，不能只看它够不够亮。还要观察光源是否直接进入视线，以及它会不会反射在屏幕、玻璃或亮面家具上。"),
    paragraph("眩光通常来自视野中亮度过高的光源，尤其当周围环境较暗时，一颗裸露的灯泡会显得格外刺眼。长时间处在这种环境里，容易引起视觉疲劳、压力和注意力下降。"),
    paragraph("有几个简单的解决方法："),
    list([
      "让灯光照向墙面、天花板或桌面，避免直接照向眼睛。",
      "使用灯罩、磨砂罩或间接照明隐藏高亮度的发光点。",
      "不要让明亮的桌灯出现在电脑屏幕的反射范围内。",
      "保留适度的背景光，避免屏幕、阅读区域和周围环境之间反差过大。"
    ]),
    paragraph("过于均匀的照明会让房间单调，反差过大又会迫使眼睛不断适应。舒适的空间需要明暗变化，也需要整体上的亮度平衡。"),
    images([
      { src: "/images/home-lighting/desk-without-glare.jpg", alt: "没有可见眩光光源的电脑桌" }
    ], "屏幕后方的背景光让高亮度光源避开视线。"),

    heading("三、灯光也在告诉身体现在是什么时间"),
    paragraph("光帮助我们看见物体，也参与调节人体的昼夜节律。"),
    paragraph("白天，较高亮度、较大面积以及短波成分较多的光，通常更容易提升警觉性。到了晚上，降低亮度并减少短波成分，更有利于身体逐渐进入休息状态。光对人体的影响同时取决于亮度、光谱、照射方向、发光面积、使用时间和持续长度，不能只根据色温判断。"),
    paragraph("因此，“冷光一定让人疲劳”并不准确。视觉疲劳往往还与眩光、反差过大、闪烁和长时间用眼有关。不过在夜晚继续使用明亮、偏冷的灯光，确实可能让人保持清醒，不利于从工作状态过渡到休息状态。"),
    paragraph("我会让家中的照明随着时间变化。白天明亮、晚上温暖、睡前极暗。这种变化接近自然光从白天到夜晚的节奏，也让房间在不同时间承担不同功能。"),

    heading("四、把灯光当作空间构图"),
    paragraph("我在小红书评论里提到过“视觉层次”和“不对称平衡”。这两个来自平面构成的概念，同样适用于照明。"),
    paragraph("平面构成练习常常是在白色背景上安排不同大小和深浅的灰色方块。夜间的家庭照明可以反过来理解：房间成为暗色背景，不同光源在其中画出大小、亮度和位置各异的亮色形状。"),
    paragraph("最亮、对比最强或位置最特殊的区域，通常会最先吸引视线。第二亮的区域形成次级焦点，其余部分则成为背景和留白。"),
    paragraph("所有地方都一样亮，空间就会失去主次。所有灯都很小、很暖、很暗，也可能变成没有秩序的“氛围灯堆砌”。更好的方法是同时安排："),
    list([
      "一片面积较大的柔和背景光；",
      "一两个较明确的功能光；",
      "少量吸引视线的重点光；",
      "一些保持安静的暗部。"
    ]),
    paragraph("不对称也可以达到平衡。例如，视线左侧有一片面积较大但亮度柔和的光，右侧可以用一盏面积较小但稍亮的灯来平衡。两边不需要长得一样，只需要拥有接近的视觉重量。"),
    paragraph("在我的房间里，窗边植物的灯就是一个重点光。晚上，它会让视线自然越过房间，落在植物和窗户附近，使空间在视觉上得到延伸。"),
    images([
      { src: "/images/home-lighting/plants-as-focal-point.jpg", alt: "窗边被照亮并形成视觉焦点的植物" }
    ], "被照亮的植物将视线引向窗边。"),

    heading("五、照明设计也要考虑被照亮的表面"),
    paragraph("灯光最终会落在墙面、地板、家具、织物、植物和人的皮肤上。因此，灯本身只完成了一半设计，另一半由材料完成。"),
    paragraph("同样的灯照在白墙、黄色地毯和黑色地毯上，效果会完全不同。"),
    paragraph("白墙反射较多光线，可以把一个较小的光源扩展成柔和的大面积背景光。黄色地毯会让反射光显得更暖。黑色地毯吸收大量光线，可以形成更稳定的暗部，但也可能让整个空间显得更暗。"),
    paragraph("表面的光泽同样重要。哑光材料会把光线较均匀地散开；玻璃、金属和亮面黑色家具可能产生非常明亮的局部反射。一个物体整体颜色很深，也可能因为镜面反射而产生眩光。"),
    paragraph("人眼感受到的表面亮度，既取决于照到表面上的光，也取决于表面对光的反射能力。照明设计因此需要与室内的颜色和材料共同考虑。"),
    images([
      { src: "/images/home-lighting/white-wall.jpg", alt: "白墙反射的光" },
      { src: "/images/home-lighting/yellow-rug.jpg", alt: "黄色地毯反射的光" },
      { src: "/images/home-lighting/black-rug.jpg", alt: "黑色地毯吸收的光" }
    ], "白墙 · 黄色地毯 · 黑色地毯"),

    heading("六、用智能家居保存不同的生活状态"),
    paragraph("当一个房间里有很多灯时，每次逐个调节会非常麻烦。我把大部分灯接入 Apple Home，并保存成三个主要场景。"),
    subheading("Daytime"),
    paragraph("白天场景会将灯光开到较高亮度。房间角落的大落地灯向天花板照射，提供面积较大的背景光；电脑屏幕后方和床头的灯也会打开。"),
    paragraph("这个场景适合工作、整理房间或阴天时补充自然光。它的目标是让整个空间清晰、明亮，并减少局部工作区域和周围环境之间的反差。"),
    subheading("Evening"),
    paragraph("晚上，我会降低整体亮度，并把光线调暖。主要保留地面上的几盏暖色小灯、照亮窗边植物的台灯，以及调暗后的屏幕后灯和床头灯。"),
    paragraph("植物是这个场景中的视觉焦点。其他灯负责平衡画面和提供基本方向感。房间仍然有清晰的层次，但不会让人继续保持白天的紧张状态。"),
    subheading("Before Sleeping"),
    paragraph("睡前只保留电脑屏幕后方和床头的两盏灯，并调成很暗的红色。它们刚好足以让我辨认周围环境，也不会形成刺眼的高亮区域。"),
    paragraph("红色并不具有神奇的助眠作用，但在亮度很低的情况下，它所包含的短波成分通常较少，能够相对减弱夜间光线的刺激。此时屏幕也应该同步降低亮度。"),
    paragraph("预设场景的价值不只在于方便。它把一天中的工作、放松和睡眠准备，转化成不同的空间状态。照明控制系统也正适合通过预设场景，为不同活动快速调整亮度、分布和色温。"),
    images([
      { src: "/images/home-lighting/daytime.jpg", alt: "Daytime 灯光场景" },
      { src: "/images/home-lighting-cover.jpg?v=20260715", alt: "Evening 灯光场景" },
      { src: "/images/home-lighting/before-sleeping.jpg", alt: "Before Sleeping 灯光场景" }
    ], "Daytime · Evening · Before Sleeping"),

    heading("七、一个简单的家庭照明设计方法"),
    paragraph("设计自己的家庭照明，可以从下面五步开始："),
    list([
      "写下房间中发生的主要活动，例如工作、阅读、用餐、收纳和休息。",
      "为每项活动安排一个位置准确的区域光。",
      "增加照向墙面或天花板的背景光，避免房间只有几个孤立的亮点。",
      "选择一两个希望人首先注意的区域，用重点光建立视觉层级。",
      "检查眩光、反射、家具颜色和材料，最后将常用状态保存成不同场景。"
    ], true),
    paragraph("买更多的灯并不会自动带来更好的照明。真正重要的是每盏灯承担什么功能，它照亮什么表面，以及它与其他光源共同形成了怎样的秩序。"),
    paragraph("好的家庭照明通常不会要求人注意灯本身。它让工作自然发生，让身体感知时间，也让目光在空间中找到自己的路径。当一个空间真正服务于人的活动时，它也会自然变得很美。")
  ];

  window.VISION_REFLECTION_CONTENT = {
    title: "How to Make Home Lighting Both Functional and Aesthetic",
    author: "Bob Tianqi Wei",
    date: "Jul 14, 2026",
    languages: [
      { code: "en", label: "EN", title: "How to Make Home Lighting Both Functional and Aesthetic" },
      { code: "zh", label: "中文", title: "如何让家庭照明兼顾功能与美学" }
    ],
    defaultLanguage: "en",
    intro: [],
    sections: [
      { language: "en", blocks: englishBlocks },
      { language: "zh", blocks: chineseBlocks }
    ]
  };
})();
