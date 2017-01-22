#ftMagicFunctions.js
Set of useful JS funtions ( I created this as member of Future Technologies Association )

##shorthands
- **__gd** - handler to document
- **__byId(String id, [Element parent])** - search the elements by Id
- **__byClass(String class, [Element parent])** - search the elements by Class
- **__byTag(String tag, [Element parent])** - search the elements by Tag Name

## set's object
The **ftmf**, or **ftMagicFunctions** is the object of this functions set

## math functions
- **ftmf.med(Array numbers, Bool options)** - return the median of range numbers, if options is TRUE, function will return the array of possibly medians (when the number of medians is higher then 1)
- **ftmf.toMousePoint(Object _data { x: Number, y: Number, [target: Element] })** - return in pixels and precents the position of cursor in **target** element, the default **target** is document
- **ftmf.random(Object _data { min: Number, max: Number, [floor: Bool] })** - random the number from **min** to **max**, if the **floor** is TRUE the type of return number will be integer
- **ftmf.precentValue(Number a, Number b)** - return how many precent of **b** is **a**
- **ftmf.precentValueBack(Number a, Number b)** - return how many is 100% if **b** is **a**%

## string functions
- **ftmf.replaceAll(String string, String from, String to)** - replace all substrings **from** into substring **to** in **string**
- **ftmf.codeASCII(String string, Char separator)** - change all chars of **string** into ASCII code, and separate these codes the **separator** char
- **ftmf.uncodeASCII(String code, Char separator)** - separate the ASCII code from **code** and change to string
- **ftmf.generateToken(Number length)** - return string token made of letters and numbers, the length of token is **length** * 2

## style functions
- **ftmf.getColorValue(Element target, String cssValue)** - return value in **#rrggbb** format of **target**'s **cssValue**
- **ftmf.getSizeObject(Element target)** - return object with position, margin and padding of **target** in pixels
- **ftmf.resizeObject(Element target, Object sizes {Number left, Number top, ... })** - set the position, margin and padding of **target** on the data in pixel from **sizes**, but the css units of **target** don't change

## other functions
- **ftmf.empty()** - just empty function
