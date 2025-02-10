<div style="display:flex;background-color:#f6f8fa;border:1px solid #f0f0f0;border-bottom:none;border-radius:10px 10px 0 0;padding:28px">
<img width="100px" style="display:inline-block;background:none" src="https://raw.githubusercontent.com/ngInit/Assets/refs/heads/main/cvA.png" alt="CV image">
<h2 style="display:inline-block;margin-top:36px;border:none;margin-left:24px">Aleksei Nikolaev</h2>
</div>
<div style="background-color:#f6f8fa;border:1px solid #f0f0f0;border-top:none;border-radius:0 0 10px 10px;padding: 0 28px 28px;">
<span style="color:steelblue">Tel:</span> <span>+36 (70) 555-17-69</span><br>
<span style="color:steelblue">Email:</span> <span>aleksey.nikolaev.eng@gmail.com</span><br>
<span style="color:steelblue">Discord:</span> Aleksei (@ngInit)<span></span><br>
<span style="color:steelblue">CV:</span> <a target="_blank" href="https://nginit.github.io/rsschool-cv/cv">Open link</a><br>
<span style="color:steelblue">GitHub:</span> <a target="_blank" href="https://github.com/ngInit">Open Link</a><br>
<span style="color:steelblue">Video on YouTube:</span> <a target="_blank" href="https://youtu.be/O8gfHQSsGRs">Open Link</a><br>
</div>
<br>
<div style="background-color:#f6f8fa;border:1px solid #f0f0f0;border-radius:10px;padding:14px">
<span style="display:inline-block;margin:0 0 8px 14px;font-weight:700;color:steelblue">TRANSCRIPT</span>
<pre style="background:none;padding:0;margin:0 0 0 14px">
    Hi there!
My name is Aleksey Nikolaev and I’m hardware engineer.

1️⃣ Bridge:
    Several years ago I finished my PhD program in ITMO University in Saint-Petersburg,&nbsp;
and now I’m a student of RS School on a frontend development course.&nbsp;
My working experience includes CNC programming engineer and such programming languages&nbsp;
as MP post and G-code, C# and C++.&nbsp;
I have created several projects for myself:
 - an application on C# to sort and to store all my photos to archive
 - an encryption application for text based on Playfair cipher with all rules and 
a keyword principle. 
 - I used C++ for programming microcontrollers and for my scientific work.\

2️⃣ Beginning of a new way:
I started self-studying a web development on Metanit because I was interested in web
technologies. I decided to get more information about modern web stack and
successfully finished HTML, CSS, and Javascript for Web Developers course&nbsp;
on Coursera and HackerRank.&nbsp;
I started to create my projects with frameworks.&nbsp;
The first one was a currency chart with an authentication form and &nbsp;
a users control panel which I created on Angular 16.&nbsp;
On React 18 I created an application with events of Hungarian House of Music.\

3️⃣ Motivation:
However it wasn’t enough to me and by good fortune I found RS School with &nbsp;
a great frontend development course.
For me, it is very important to have solid base and get knowledge about modern &nbsp;
best practices in web development because I want to be high quality professional &nbsp;
in that field and create high quality applications.

4️⃣ Challenge:
A couple weeks ago on the RS School course we got Nonograms task. I was excited &nbsp;
and a bit scared because I have never solve this puzzle. Any way, I learned rules &nbsp;
and started to develop it. The biggest challenge to me was to find a way &nbsp;
how to show cells one by one in loop with timeout. It turned out to be simple,
multiply the time for each cycle. The more interesting part was increasing &nbsp;
the speed for big matrix.
But I solved this task too just dividing time to matrix size.

5️⃣ Outro:
If you would like to find out more, get in touch, download my CV or &nbsp;
just drop me a message.
Thank you for your time!&nbsp;
Hit the like button, subscribe and see you soon!
</pre>
</div>
<br>
<div style="background-color:#f6f8fa;border:1px solid #f0f0f0;border-bottom:none;border-radius:10px 10px 0 0;padding:14px">
<span style="display:inline-block;margin:0 0 0 14px;font-weight:700;color:steelblue">CODE EXAMPLE</span>
</div>

````js
    picArray.forEach((value, index) => {
      setTimeout(() => {
        ...
      }, (25 / gridSize) * index);
    });
````