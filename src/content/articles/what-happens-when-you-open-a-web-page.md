---
title: "What happens in the second after you open a web page"
description: "From the address you type to the words on screen: DNS, a handshake, a request and a render, in the order they happen."
pubDate: 2026-10-22
tags: ["Web", "Networking"]
---

You press Enter and a page appears. It feels like one step, but your computer has just run a relay race across several systems, each handing the baton to the next. Following the baton is the best way to understand why some pages feel instant and others stall.

## Step one: turning a name into an address

Computers find each other by numeric addresses, such as `93.184.216.34`. People prefer names, such as `example.com`. The Domain Name System, or DNS, is the phone book that connects the two.

Your computer first checks its own memory. If it looked up this name recently, the answer is already there and the step is almost free. If not, it asks a resolver, usually run by your internet provider or a public service. The resolver may in turn ask a chain of servers: one that knows who runs `.com`, then one that knows who runs `example.com`. Each answer comes with a time limit saying how long it may be remembered.

That time limit is why a change to a website's address can take hours to reach everyone. Thousands of resolvers are still holding the old answer until their timers run out.

## Step two: opening a connection

With an address in hand, your browser opens a connection. For most sites this means two things happening almost together:

1. **A transport handshake.** Your computer and the server agree to talk and set up how data will be numbered and acknowledged, so that lost pieces can be noticed and sent again.
2. **An encryption handshake.** The server shows a certificate that proves it really is `example.com`, and the two sides agree on secret keys. After this, anyone watching the network sees only scrambled data.

Every round trip in this stage costs real time, because it is bounded by the distance light can travel in a cable. A server on the other side of the planet cannot answer in less than a fraction of a second no matter how fast it is. This is one reason sites are served from many locations at once.

## Step three: asking for the page

Now the browser sends a request. In its simplest form it says "give me the page at this path" and adds a few details: which languages you read, which formats it can decode, and any cookies the site has set before.

The server answers with a status and the content. A status beginning with 2 means success, 3 means "look somewhere else", 4 means the request was wrong, and 5 means the server failed. The content is usually HTML, a text file describing the page's structure.

## Step four: building the picture

The browser does not wait for the whole file. As HTML arrives it is read from top to bottom and turned into a tree of elements. Whenever it meets a reference to something else, such as a stylesheet, a script, an image or a font, it queues another request.

Two kinds of file can stop the show:

- **Stylesheets** block drawing, because showing text before knowing its styling would make the page flash and jump.
- **Scripts** can block reading the rest of the HTML, because a script might change it. Marking a script as `defer` tells the browser it can wait.

Once the tree and the styles are both ready, the browser works out where everything goes, then paints it. The first moment something meaningful appears is what performance engineers call the first paint, and it is the number most closely tied to how fast a page feels.

## Why this is useful to know

Each step suggests a fix when a page is slow.

| Slow step | What helps |
| --- | --- |
| Finding the address | Fewer different domains on one page |
| Opening the connection | Serving from a location near the reader |
| Waiting for the first byte | Prebuilt pages instead of pages assembled on request |
| Downloading | Smaller images and fonts |
| Drawing | Less blocking CSS and script |

This site is built ahead of time into plain files, which removes the "assembled on request" step entirely. The server only has to hand over a finished page, and the browser can start drawing straight away.
