# Markdown Language Syntax

For full documentation visit [mkdocs.org](https://mkdocs.org).

## Headers
----------

```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# H1 header line
## H2
### H3
#### H4
##### H5
###### H6

## header line with underscore

- - -


```
Headers with underline:

### H3
- - -

### H3
---
```

## Text Decorations
- - -

```
**This is strong text**
*This is emphasize*
_this is italic_
~~This is strike through (Supported by Python exterion: tilde)~~

++This is underline++ (Not supported by all)
==This is highlight== (Supported by Python exterion: mark)
```

**This is strong text**

*This is emphasize*

_This is italic_

~~This is strike through~~

++This is underline++

==This is highlight==

## Links
----
```
[This is a link to Google](https://www.google.ca)
```
[This is a link to Google](https://www.google.ca)

```language
![Link to JoyHome Logo Image](assets/images/logo.jpg)
```
![JoyHome Logo](../assets/images/logo.jpg)


## Unordered List

- - -

* This is an unordered list

	* Nested ordered list
	* second nested]

* Second bullet list item

## Block Quote
---

```
> This is a block of quote

> second sentence
```

> This is a block of quote

> second sentence

## Table
---
```Markdown
| column | column |
|--------|--------|
|  First | Second |
```

| column | column |
|--------|--------|
|  First | Second |

## Code and Bullet
- - -

1. This is a bullet.
2. This is the end of the first bullet list, with a fenced code block following:

```
Code
More Code
```

1. This is the start of a new bullet list. Hey, where is my fenced code?
```
Code
More Code
```

2. Maybe we can do it with indenting?
	Code
    More Code
3. Did that work? No, so we will try with separation:

    Code
    More Code

4. Now I will try more indenting, to match the bullet margin, plus 4:

		Code
		More Code
# 
5.  Well that was disappointing. How about we indent and use backticks together?
		```
        Code
        More Code
        ```
6. No such luck. This time, with separation too:

    ```
    Code
    More Code
    ```

7. Don't tell me that worked?? Does it work with nested bullets?

   	1. First nested bullet

        ```
        Code
        More Code
        ```

	2. Second nested bullet




## Python extensions
---
Here is the link to [Python extension list](https://facelessuser.github.io/pymdown-extensions/)

???+ note "Open styled details (extension:details)"

    ??? danger "Nested details!"
        And more content again.

!!! note "Discussion"
    (extension:admonition)
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.


!!! important "Important"
    Important sentences

``` C# hl_lines="1 3"
using system.io;
using System;
//Supported by extension:codehilite

```


Sentence Break
_ _ _

<div markdown="1">

* try markdown within div, supported by extention:extra

</div>

Comment is invisible on Page
<!--This is a comment-->

