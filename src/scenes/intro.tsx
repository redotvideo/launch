import {Audio, Video, SVG, Txt, Line, Layout, Img, Rect, makeScene2D, useScene2D, word, Code, LezerHighlighter, lines, DefaultHighlightStyle, CodeHighlighter, View2D} from '@revideo/2d';
import {all, chain, createRef, Reference, createSignal, waitFor} from '@revideo/core';
import {parser as javascript} from '@lezer/javascript';
import {tags} from '@lezer/highlight';
import {HighlightStyle} from '@codemirror/language';
import { oneDarkHighlightStyle, color } from '@codemirror/theme-one-dark';

/*
const MyStyle = HighlightStyle.define([
  {tag: tags.keyword, color: color.violet},
  {tag: tags.function(tags.variableName), color: color.cursor},
  {tag: tags.number, color: 'blue'},
  {tag: tags.string, color: 'green'},
  {tag: tags.bracket, color: color.malibu},
  {tag: tags.variableName, color: color.cyan},
  {tag: tags.separator, color: "grey"},
  {tag: tags.comment, color: color.ivory},
  {tag: tags.attributeName, color: color.sage},
  {tag: tags.annotation, color: color.sage},
  {tag: tags.macroName, color: "red"},
  {tag: tags.propertyName, color: color.chalky},
  {tag: tags.brace, color: color.malibu},
  {tag: tags.operator, color: color.malibu}
  // ...
]);
*/

const MyStyle = HighlightStyle.define([
  {
    tag: tags.comment,
    color: '#8E908C',
  },
  {
    tag: [tags.variableName, tags.self, tags.propertyName, tags.attributeName, tags.regexp],
    color: '#C82829',
  },
  {
    tag: [tags.number, tags.bool, tags.null],
    color: '#F5871F',
  },
  {
    tag: [tags.className, tags.typeName, tags.definition(tags.typeName)],
    color: '#C99E00',
  },
  {
    tag: [tags.string, tags.special(tags.brace)],
    color: '#718C00',
  },
  {
    tag: tags.operator,
    color: '#3E999F',
  },
  {
    tag: [tags.definition(tags.propertyName), tags.function(tags.variableName)],
    color: '#4271AE',
  },
  {
    tag: tags.keyword,
    color: '#8959A8',
  },
  {
    tag: tags.derefOperator,
    color: '#4D4D4C',
  },
  {
    tag: tags.bracket,
    color: "grey"
  },
  {
    tag: tags.separator,
    color: "grey"
  },
  {
    tag: tags.punctuation,
    color: "grey"
  },
  {
    tag: tags.typeOperator,
    color: "grey"
  }

]);


javascript.configure({
  dialect: 'jsx ts',
})

export default makeScene2D(function* (view) {
  LezerHighlighter.registerParser(javascript.configure({
    dialect: 'jsx ts',
  }));
  const logoRef = createRef<Img>();
  const backgroundRef = createRef<Rect>();

  view.add(
    <>
      <Audio src={"/audio.wav"} time={0.4} volume={1.0} play={true} playbackRate={1.1}/>
      <Rect size={["100%", "100%"]} fill="#F5F5F5" ref={backgroundRef}/>
    </>,
  );

  yield* waitFor(0.8);

  const block1 = createRef<Rect>()
  const block2 = createRef<Rect>()
  const block3 = createRef<Rect>()
  const blocks = createRef<Layout>();
  const logoText = createRef<Txt>();
  view.add(
    <>
    <Layout ref={blocks} x={-600}>
      <Rect fill={"#151515"} height={60} y={-80} x={-620} width={180} radius={9.3} ref={block1} />
      <Rect fill={"#151515"} height={60} width={180} x={-540} radius={9.3} ref={block2} />
      <Rect fill={"#151515"} height={60} width={180} x={-460} y={80} radius={9.3} ref={block3} />
      <Txt ref={logoText} fontFamily={"Lexend"} x={53+757.5} y={20} fontSize={300} letterSpacing={-4} fontWeight={700} text={""}/>
    </Layout>
    </>
  );
  
  yield* all(
    block1().position.x(-80, 0.5),
    chain(waitFor(0.1), block2().position.x(0, 0.4)),
    //block1().position.y(-80, 0.5),
    chain(waitFor(0.2), block3().position.x(80, 0.3)),
    //block3().position.y(80, 0.5)
  )

  yield* logoText().text("revideo", 1);

  yield* waitFor(1)
  yield* all(
    blocks().scale(0.5, 1),
    blocks().position.x(-300, 1),
    blocks().position.y(-150, 1)
  )

  /*yield* chain(
    all(logoRef().scale(40, 2/1.1), logoRef().rotation(360, 2/1.1)),
    logoRef().scale(50, 1/1.1),
  );
  */

  yield* waitFor(0.7);



  const textRef = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} y={100} fontSize={80} fontWeight={600} ref={textRef}/>
  );

  yield* all(
    chain(textRef().text("Create Videos in Typescript", 3/1.1)))
  yield* waitFor(2/1.1);

  yield* all(
    blocks().position.y(blocks().position.y()-800, 1/1.1), 
    textRef().position.y(textRef().position.y()-800, 1/1.1));

  const githubRef = createRef<Img>();
  const githubRef2 = createRef<Img>();
  const githubLinkRef = createRef<Txt>();
  const githubLinkRef2 = createRef<Txt>();

  view.add(
    <>
      <Img ref={githubRef} src={"/screenshot5.png"} y={100} width={"1%"} zIndex={2}/>
      <Img ref={githubRef2} src={"/screenshot.png"} y={100} width={"1%"} zIndex={1}/>
      <Txt ref={githubLinkRef} y={-360} fontFamily={"Lexend"} fontSize={50} fontWeight={600}/>
      <Txt ref={githubLinkRef2} y={-360} fontFamily={"Lexend"} fontSize={50} opacity={0} text={"https://github.com/redotvideo/revideo"} fontWeight={600}/>
    </>
  );

  yield* all(githubRef().scale(70, 2), githubRef2().scale(70, 2));
  yield* githubLinkRef().text("https://github.com/redotvideo/launch", 2);

  yield* all(
    githubRef().scale(45, 2), githubRef().position.x(-450, 2), 
    githubRef2().scale(45, 2), githubRef2().position.x(450, 2),
    githubLinkRef().x(githubRef().x, 2), githubLinkRef().y(-300, 2), githubLinkRef().fontSize(30, 2),
    githubLinkRef2().x(githubRef2().x, 2), githubLinkRef2().y(-300, 2), githubLinkRef2().fontSize(30, 2), githubLinkRef2().opacity(1, 2)
  )

  yield* waitFor(1.5);

  yield* all(
    githubLinkRef().position.y(githubLinkRef().position.y()-1000, 1/1.1), 
    githubLinkRef2().position.y(githubLinkRef2().position.y()-1000, 1/1.1),
    githubRef().position.y(githubRef().position.y()-1000, 1/1.1),
    githubRef2().position.y(githubRef2().position.y()-1000, 1/1.1),
  );

  const textRef2 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} fontSize={120} fontWeight={600} ref={textRef2}/>
  );

  yield* chain(textRef2().text("Create Video Apps", 2), waitFor(1), textRef2().opacity(0,1), waitFor(2));

  const textRef3 = createRef<Txt>();
  view.add(
    <Txt y={-360} fontFamily={"Lexend"} fontSize={80} fontWeight={600} ref={textRef3}/>
  );
  yield*textRef3().text("Define a Video Template", 2);
  yield* waitFor(0.2);

  view.add(
    <Img
      src={'/logo_mc.png'}
      width={"1%"}
      ref={logoRef}
    />
  );

  yield* chain(all(logoRef().scale(20, 2/1), logoRef().rotation(360, 2/1)), waitFor(0.5), logoRef().opacity(0, 1));

  const codeRef= createRef<Code>();
  view.add(
    <Code
    ref={codeRef}
    textAlign={"left"}
    highlighter={new LezerHighlighter(MyStyle)}
    zIndex={10}
    fontSize={50}
    opacity={0}
    fontFamily={'JetBrains Mono, monospace'}
    code={
`export default makeScene2D(function* (view){

});
`
  }/>);

  yield* codeRef().opacity(1, 1);
  yield* waitFor(2.8);
  yield* codeRef().code.insert([1, 2], 'yield; // frame 1 \n', 0.4);
  yield* waitFor(0.4);
  yield* codeRef().code.insert([2, 2], 'yield; // frame 2 \n', 0.4);
  yield* waitFor(0.4);
  yield* codeRef().code.insert([3, 2], 'yield; // frame 3 \n', 0.4);
  yield* waitFor(1.1);

  yield* all(
  codeRef().position.x(-300, 1), 
  codeRef().position.y(100, 1), 
  codeRef().fontSize(30, 1),
  codeRef().code.remove(lines(1,4), 0.5)
);

  const videoRef = createRef<Video>();
  const textRef4 = createRef<Txt>();
  view.add(<Video volume={0} ref={videoRef} src={"stars.mp4"} x={600} y={100} play={true} loop={true} width={5}/>)
  view.add(<Txt fontFamily={"Lexend"} position={videoRef().position} fontSize={40} text={"Hi everyone!"} fill={"white"} opacity={0} ref={textRef4}/>)


  yield* all(codeRef().code.insert([1, 2], 'yield view.add(<Video src={"stars.mp4"} />); \n', 0.5), videoRef().scale(120, 1));
  yield* waitFor(2);
  yield* all(codeRef().code.insert([2, 2], `\n  const textRef = createRef();
  yield view.add(<Txt text={"Hi everyone!"} ref={textRef} />); \n`, 0.5));
  yield* textRef4().opacity(1,1);

  yield* all(
    codeRef().code.insert([5, 2], '\n  yield* chain(\n    textRef().scale(2, 1.5),\n    textRef().scale(1, 1.5)\n  );', 1),
    chain(textRef4().scale(2, 1.5), textRef4().scale(1, 1.5))
  );

  yield* waitFor(5);

  yield* codeRef().selection(codeRef().findAllRanges(/Hi\s+everyone!/gi), 0.5);
  yield* waitFor(1);
  yield* chain(
    codeRef().code.replace(word(4, 32, 8), "Alice", 1),
    codeRef().code.replace(word(4, 32, 5), "Bob", 1)
  )
  yield* all(codeRef().opacity(0, 1), videoRef().opacity(0, 1), textRef4().opacity(0, 1));


  const codeRef2 = createRef<Code>();
  view.add(
    <Code
    ref={codeRef2}
    textAlign={"left"}
    highlighter={new LezerHighlighter(MyStyle)}
    zIndex={10}
    fontSize={40}
    opacity={0}
    y={50}
    fontFamily={'JetBrains Mono, monospace'}
    code={
`useScene().variables.get('username', 'everyone')();
`
  }/>);

  const groupRef = createRef<Layout>();
  yield view.add(
    <>
    <Layout ref={groupRef} opacity={0}>
      <Rect fill={"#151515"} size={[210, 4]} position={[105, 60]}/>
      <Rect fill={"#151515"} size={[210, 4]} position={[400, 60]}/>
      <Txt text={"variable name"}  fontFamily={"Lexend"} fontSize={20} fontWeight={600} position={[105, 80]}/>
      <Txt text={"default value"}   fontFamily={"Lexend"} fontSize={20} fontWeight={600} position={[400, 80]}/>
    </Layout>
    </>
  );

  yield* all(codeRef2().opacity(1, 1), groupRef().opacity(1, 1));

  //yield* codeRef().code.replace(word(5, 28, 9), "useScene().variables.get('name', '')()", 1)
/*
  yield* all(
    codeRef().code.replace(lines(0,12), "useScene", 1),
    //codeRef().code.insert([0, 0], "useScene", 1)
  )
  */

  yield* waitFor(1);

  const variablesRef = createRef<Code>();
  view.add(
    <Code
    ref={variablesRef}
    textAlign={"left"}
    highlighter={new LezerHighlighter(MyStyle)}
    zIndex={10}
    fontSize={35}

    opacity={0}
    y={200}
    x={-350}
    fontFamily={'JetBrains Mono, monospace'}
    code={
`variables = {
  username: 'Alice',

}
`
  }/>);

  const videoRef2 = createRef<Video>();
  const videoText = createRef<Txt>();
  view.add(
    <>
      <Video volume={0} opacity={0} ref={videoRef2} src={"stars.mp4"} x={300} y={200} play={true} loop={true} width={"30%"} />
      <Txt fontFamily={"Lexend"} position={videoRef2().position} fontSize={40} text={"Hi Alice!"} zIndex={10} fill={"white"} opacity={0} ref={videoText}/>
    </>
  )



  yield* all(
    codeRef2().position.y(codeRef2().position.y()-200, 1), 
    groupRef().position.y(groupRef().position.y()-200, 1), 
    variablesRef().opacity(1, 1),
    videoRef2().opacity(1, 1),
    videoText().opacity(1, 1)
  );


  yield* waitFor(4);

  const videoRef3 = createRef<Video>();
  view.add(
    <>
      <Video volume={0} opacity={0} ref={videoRef3} src={"trees.mp4"} x={300} y={200} width={"30%"} />
    </>
  )

  yield* all(
    variablesRef().code.insert([2, 2], "vid: 'trees.mp4'", 1),
    videoRef2().opacity(0, 1),
    videoRef3().opacity(1, 1)
  )

  videoRef3().play();

  yield* waitFor(3);

  videoRef3().pause();

  yield* all(
    textRef3().opacity(0, 1),
    codeRef2().opacity(0, 1),
    groupRef().opacity(0, 1),
    videoRef3().opacity(0, 1),
    variablesRef().opacity(0, 1),
    videoText().opacity(0, 1)
  )

  yield* waitFor(1);


  const canvasRef = createRef<Img>();
  yield view.add(
    <Img src={"html_canvas.png"} height={"30%"} x={-1200} ref={canvasRef}/>
  )
  yield* canvasRef().position.x(0, 1);
  yield* waitFor(1.5);
  yield* canvasRef().position.x(1200, 1);

  const textRef5 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} fontSize={80} fontWeight={600} ref={textRef5}/>
  );

  yield* textRef5().text("Preview Your Video in the Browser", 3);
  yield* textRef5().position.y(-360, 1.5);

  yield* waitFor(0.8)
  const npmStart = createRef<Txt>();
  view.add(
    <Txt fontFamily={"JetBrains Mono"} fontSize={70} y={50} fontWeight={500} ref={npmStart}/>
  );

  yield* npmStart().text("npm start", 0.7);
  yield* waitFor(0.5);
  yield* npmStart().opacity(0, 0.1);



  const editorRef= createRef<Img>();
  const editorDescRef = createRef<Txt>();
  yield view.add(
    <>
      <Img ref={editorRef} src={"/screenshot2.png"} y={900} x={-450} width={"45%"} zIndex={2}/>
      <Txt text={"Editor for Development"} fontSize={40} fontFamily={"Lexend"} fontWeight={600} fill={"#151515"} x={-450} y={1200} ref={editorDescRef}/>
    </>
  )

  yield* waitFor(0.5);
  yield* all(editorRef().y(50, 1.5), editorDescRef().y(450, 1.5));

  yield* waitFor(3);

  const editorRef2= createRef<Img>();
  const editorDescRef2 = createRef<Txt>();
  yield view.add(
    <>
      <Img ref={editorRef2} src={"/screenshot3.png"} y={900} x={450} width={"45%"} zIndex={2}/>
      <Txt text={"User-Facing <Player/>"} fontSize={40} fontFamily={"Lexend"} fontWeight={600} fill={"#151515"} x={450} y={1200} ref={editorDescRef2}/>
    </>
  )

  yield* waitFor(1.5);
  yield* all(editorRef2().y(50, 1.5), editorDescRef2().y(450, 1.5));

  yield* waitFor(5.8);

  yield* all(
    textRef5().position.y(-2000, 2),
    editorRef().position.y(-1600, 2),
    editorRef2().position.y(-1600, 2),
    editorDescRef().position.y(-1200, 2),
    editorDescRef2().position.y(-1200, 2)
  )

  yield* waitFor(0.5);

  const textRef6 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} fontSize={80} fontWeight={600} ref={textRef6}/>
  );

  yield* textRef6().text("Export to MP4", 2);
  yield* textRef6().position.y(-360, 1.5);


  const codeRef3 = createRef<Code>();
  view.add(
    <Code
    ref={codeRef3}
    textAlign={"left"}
    highlighter={new LezerHighlighter(MyStyle)}
    zIndex={10}
    fontSize={40}
    opacity={0}
    fontFamily={'JetBrains Mono, monospace'}
    code={
`import { renderVideo } from '@revideo/renderer';

const file = renderVideo({
  projectFile: './src/project.ts'
});`
  }/>);

  yield* codeRef3().opacity(1, 0.5);

  yield* waitFor(3);

  const duration = createSignal(1);
  const textRef7 = createRef<Txt>();
  view.add(
    <Txt y={300} fontFamily={"Lexend"} fontSize={50} ref={textRef7} fontWeight={600} text={""}/>
  );
  yield* waitFor(1);
  yield* textRef7().text(() => `Rendering 60s of a 1080p video: ${duration().toFixed(1)}s`, 2);
  yield* duration(14.3, 1.5);

  yield* waitFor(1);

  yield* all(
    textRef7().opacity(0, 1),
    codeRef3().opacity(0, 1)
  );

  yield* waitFor(2);

  const textRef8 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} textAlign={"left"} direction={"row"} opacity={0} text={"Start Workers"} fontSize={30} fill={"#151515"} fontWeight={600} left={[-595, 0]} ref={textRef8}/>
  );

  yield* all(drawLine(view, [-700, 50], [-400, 50], 1), textRef8().opacity(1, 1));
  yield* all(
    drawLine(view, [-400, 50], [-150, 250], 0.5),
    drawLine(view, [-400, 50], [-150, 50], 0.5),
    drawLine(view, [-400, 50], [-150, -150], 0.5),
  )

  const lambdas = []
  for (let i=0; i<3; i++){
    const lambdaRef = createRef<Img>();
    view.add(
      <Img
        src={'/lambda.png'}
        width={"1%"}
        ref={lambdaRef}
        y={250-i*200}
      />
    );
    lambdas.push(lambdaRef);
  }

  yield* all(
    ...lambdas.map(lambda => lambda().scale(8, 1))
  );

  yield* all(
    drawLine(view, [150, 250], [400, 50], 0.5),
    drawLine(view, [150, 50], [400, 50], 0.5),
    drawLine(view, [150, -150], [400, 50], 0.5)
  )

  const textRef9 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} textAlign={"left"} direction={"row"} opacity={0} text={"Merge Results"} fontSize={30} fill={"#151515"} fontWeight={600} right={[595, 0]} ref={textRef9}/>
  );
  yield* all(drawLine(view, [400, 50], [700, 50], 1), textRef9().opacity(1, 1));

  yield* waitFor(1.5);

  yield* all(
    ...lambdas.map(lambda => lambda().opacity(0, 1)),
    ...view.children()
    .filter(el => el instanceof Line)
    .map(el => (el).opacity(0, 1)),
    textRef8().opacity(0, 1),
    textRef9().opacity(0, 1),
    textRef6().opacity(0, 1)
  );

  const textRef10 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} fontSize={120} fontWeight={600} ref={textRef10}/>
  );

  yield* chain(textRef10().text("And That's It!", 1), waitFor(1), textRef10().opacity(0,1), waitFor(0.5));

  const offset = 0;

  const arrow1 = createRef<Line>();
  view.add(
    <Line
    stroke={'#a4a4a4'}
      ref={arrow1}
      points={[
        [-500+offset, 0],
        [-500+offset, 0],
      ]}
      lineWidth={4}
      endArrow={true}
    />,
  );

  const arrow2 = createRef<Line>();
  view.add(
    <Line
    stroke={'#a4a4a4'}
      ref={arrow2}
      points={[
        [0+offset, 500],
        [0+offset, 500],
      ]}
      lineWidth={4}
      endArrow={true}
    />,
  );


  const axis11 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} textAlign={"left"} direction={"row"} opacity={0} text={"inflexible & unpleasant"} fontSize={20} fill={"#151515"} fontWeight={600} x={-385} y={-20} ref={axis11}/>
  );
  const axis12 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} textAlign={"left"} direction={"row"} opacity={0} text={"flexible & fun"} fontSize={20} fill={"#151515"} fontWeight={600} x={395} y={-20} ref={axis12}/>
  );
  const axis21 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} textAlign={"left"} direction={"row"} opacity={0} text={"closed"} fontSize={20} fill={"#151515"} fontWeight={600} x={-50} y={470} ref={axis21}/>
  );
  const axis22 = createRef<Txt>();
  view.add(
    <Txt fontFamily={"Lexend"} textAlign={"left"} direction={"row"} opacity={0} text={"open"} fontSize={20} fill={"#151515"} fontWeight={600} x={-50} y={-460} ref={axis22}/>
  );

  yield* all(
    arrow1().points([[-500+offset, 0], [510+offset, 0]], 1), 
    arrow2().points([[0+offset, 500], [0+offset, -510]], 1),
    chain(
      all(
        axis11().opacity(1, 0.5),
        axis21().opacity(1, 0.5)  
      ),
      all(
        axis12().opacity(1, 0.5),
        axis22().opacity(1, 0.5)  
      )
    )
  );
  yield* waitFor(0.5)

  const logos = createRef<Layout>();
  const ourLogo = createRef<Img>();
  view.add(
    <>
      <Layout opacity={0} ref={logos}>
        <Img src={"cloudinary.png"} x={-300} y={350} width={250} shadowBlur={2} shadowColor={"grey"} />
        <Img src={"moviepy.png"} x={-100} y={-350} width={200} shadowBlur={2} shadowColor={"grey"} />
        <Img src={"remotion.png"} x={420} y={-100} width={250} shadowBlur={2} shadowColor={"grey"} />
        <Img src={"shotstack.png"} x={100} y={300} width={200} shadowBlur={2} shadowColor={"grey"} />
        <Txt fontFamily={"Lexend"} fontSize={30} y={450} x={680} fontWeight={600} text={"This is based on our opinion.\nPlease don't sue us 🙏"}/>
      </Layout>
      <Img ref={ourLogo} src={"logo.png"} x={420} y={-350} width={200} shadowBlur={2} opacity={0} shadowColor={"grey"} />
    </>
  )



  yield* logos().opacity(1, 1);
  yield* waitFor(2);
  yield* all(ourLogo().opacity(1, 1), chain(ourLogo().scale(1.5, 1), ourLogo().scale(1.2, 1)));
  yield* waitFor(1);
  yield* all(
    logos().opacity(0, 1),
    ourLogo().opacity(0, 1),
    arrow1().opacity(0, 1),
    arrow2().opacity(0, 1),
    axis11().opacity(0, 1),
    axis12().opacity(0, 1),
    axis21().opacity(0, 1),
    axis22().opacity(0, 1)
  )

  yield playOutroMusic(view);

  yield* waitFor(2);


  const githubRef3 = createRef<Img>();
  const githubLinkRef3 = createRef<Txt>();
  const githubLogoRef3 = createRef<Img>();
  const docsRef = createRef<Img>();
  const docsLinkRef = createRef<Txt>();

  view.add(
    <>
      <Img ref={githubRef3} src={"/screenshot.png"} y={100} x={-1600} width={"70%"} zIndex={1} opacity={1}/>
      <Txt ref={githubLinkRef3} y={-380} fontFamily={"Lexend"} x={-1600} text={"redotvideo/revideo"} fontSize={50} fontWeight={600} opacity={1}/>
      <Img ref={githubLogoRef3} src="/github.svg" height={githubLinkRef3().height()-10} y={githubLinkRef3().y} x={-1700} zIndex={300} />
      <Img ref={docsRef} src={"/screenshot4.png"} y={100} x={-1600} width={"70%"} zIndex={1} opacity={1}/>
      <Txt ref={docsLinkRef} y={-380} fontFamily={"Lexend"} x={-1600} text={"https://docs.re.video"} fontSize={50} fontWeight={600} opacity={1}/>
    </>
  );

  //yield playOutro(view);


  yield* all(
    githubRef3().position.x(0, 1),
    githubLinkRef3().position.x(30, 1),
    githubLogoRef3().position.x(-250, 1)
  )

  yield* waitFor(1.5);

  yield* all(
    githubRef3().position.x(1600, 1),
    githubLinkRef3().position.x(1630, 1),
    githubLogoRef3().position.x(1580, 1),
    docsRef().position.x(0, 1),
    docsLinkRef().position.x(0, 1),
  )



  yield* all(
  )

  yield* waitFor(1);


  yield* all(
    docsRef().position.x(1600, 1),
    docsLinkRef().position.x(1630, 1),
  )

  const memeRef = createRef<Img>();
  view.add(
    <Img
      src={'/meme.png'}
      width={"1%"}
      ref={memeRef}
    />
  );

  yield* chain(memeRef().scale(50, 1), waitFor(1.5), memeRef().scale(0, 1));

  yield* waitFor(1)


  const explosion = createRef<Video>();
  console.log("now");
  view.add(
    <Video
      src={'/explosion_transparent.webm'}
      width={"130%"}
      ref={explosion}
      play={true}
      time={2.2}
      volume={0.1}
      zIndex={1}
    />
  );

  yield* waitFor(1);
  const endLogoRef = createRef<Img>();
  view.add(
    <Img
      src={'/logo.png'}
      width={"1%"}
      ref={endLogoRef}
    />
  );
  yield* chain(
    all(chain(waitFor(0.5), endLogoRef().ripple(2)), endLogoRef().rotation(1080, 4), chain(endLogoRef().scale(50, 2), endLogoRef().scale(30, 1)))
  );

  const textRef11 = createRef<Txt>();
  const textRef12 = createRef<Txt>();
  const textRef13 = createRef<Txt>();
  view.add(
    <> 
      <Txt y={50} fontFamily={"Lexend"} fontSize={60} fontWeight={600} ref={textRef11}/>
      <Txt y={150} fontFamily={"Lexend"} fontSize={40} fontWeight={600} ref={textRef12}/>
      <Txt y={200} fontFamily={"Lexend"} fontSize={40} fontWeight={600} ref={textRef13}/>
    </>
  );

  yield* all(
    endLogoRef().position.y(-200, 1.5),
    chain(textRef11().text("Thanks for watching <3", 2), waitFor(0.5), textRef12().text("https://github.com/redotvideo/revideo", 1.5), textRef13().text("https://re.video", 1.5))
  );

  yield* waitFor(16.5);
});


function* drawLine(view: View2D, start: [number, number], end: [number, number], time: number, ){
  const line = createRef<Line>();
  view.add(
    <Line
    stroke={'#a4a4a4'}
      ref={line}
      points={[
        start,
        start,
      ]}
      lineWidth={4}
    />,
  );

  yield* line().points([start, end], time);

}

function* playOutroMusic(view: View2D){
  for(let i = 0; i < 24; i++){
    const outro = createRef<Audio>();
    view.add(
      <Audio
        src={'/outro.mp3'}
        width={"100%"}
        ref={outro}
        play={true}
        volume={0.0005+i*0.0015}
        time={3+i*0.5}
      />
    );
    yield* waitFor(0.5);
    outro().pause();
    outro().remove();
  }
  const outro = createRef<Audio>();
  view.add(
    <Audio
      src={'/outro.mp3'}
      width={"100%"}
      ref={outro}
      play={true}
      volume={0.0005+60*0.001}
      time={3+24*0.5}
    />
  );
  yield* waitFor(28)
}
