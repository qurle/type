---
layout: '@layouts/MD.astro'
title: This is type.
simpleTitle: true
hideBack: true
hideHeader: true
---
# This is type.

Zen markdown-friendly editor

<img class="hero-image" src="/hello/hero-image.webp" alt="Look of type homepage" width="1920" height="1320"/>

<div class="center no-padding"><a class="primary button" href='/'><i>Start typing</i></a></div>

<br/><br/><br/>

### Your digital notebook

The design of *type* is based on blank notebook. It lacks distractions that may restrain your thoughts. Unleash your creativity and just type your thoughts 
<span style="opacity: .5">/ blog posts </span>
<span style="opacity: .4">/ notes </span>
<span style="opacity: .3">/ docs </span>
<span style="opacity: .2">/ etc. </span>

Switch fonts and themes to pick the appearance that suits you the best.

<br/>

### Local-first

*Type* is fast, offline-able and well-secured. We only store the notes you published without any additional personal data.

<br/>

### Share and export

Import markdown and text files. Export files. Publish your notes [to the web](/note/example). Duplicate and edit public notes. All in your browser.

<br/>

### Markdown-based

Markdown is easy markup language which makes *type* more than plain text editor. There are things like **bold texts**, [links](http://type.baby), `code`, images and headings.

<br/>

<img src="/hello/appearance.webp" alt="Example of switching font and theme" width="1920" height="1000"/>

<br/><br/>

## FAQ

**Why type?**  
It's simple.

**What's your price?**  
Free.

**I don't trust my browser. What if my notes disappear?**  
Notes will persist until you clear website data. So just don't.  
Safari *may* delete notes after [7 days of inactivity](https://webkit.org/tracking-prevention/#:~:text=to%2024%20hours.-,7%2DDay%20Cap%20on%20All%20Script%2DWriteable%20Storage,-Trackers%20executing%20script), so it's not very reliable.

You can also export your notes from the menu to your downloads (and then upload them again when needed).

**How to access notes from another device?**  
Sync feature is not available yet. You can download and upload files yourself or publish note and then copy it from another device. 

**I published a note, how do I access it?**  
1–3 seconds, after publishing note link will be copied to the clipboard. Just don't leave the editor.

**I need to know markdown?**  
Not at all. You can write plain text as in notepad. However, you can check markdown reference and shortcuts in menu.

**Can I import from Notion?**  
You can export Notion pages as markdown and upload them into *type*. Not all functions of Notion will work, though.


**Maybe desktop version?**  
You can use [nativefier](https://github.com/nativefier/nativefier). If you have Node.js installed, it's as simple as
```sh
npm install -g nativefier
nativefier 'type.baby'
```

<br/>
<div class="center">∗ ∗ ∗</div>
<br/>

Designed and developed by [<img alt="userpic of qurle" src="https://avatars.githubusercontent.com/u/32414396?v=4" class="avatar">qurle](https://qurle.net) with the great help of [<img alt="userpic of qurle" src="https://avatars.githubusercontent.com/u/32977836?v=4" class="avatar">kulizh](https://kulizh.ru). Inspired by iA Writer, Teletype, Telegraph and Notion.

*Type* is [open-source](https://github.com/qurle/type). Share bugs and ideas via [issues](https://github.com/qurle/type/issues). Any dialogs are also welcome at [nick@qurle.net](mailto:nick@qurle.net?subject=type.).

<div class="center"><a class="primary button" href='/'><i>Go type!</i></a></div>

<br/>

---
<br/>
<!-- <br/>
<div class="divider">∗ ∗ ∗</div>
<br/> -->

<footer><span><a href="/">type</a>. ©️ all lefts reversed</span><div class="legal"><a href="/privacy">Privacy policy</a><a href="/terms">Terms of service</a></footer>

<style>
	a > i {
		position: relative;
		left: -1px;
	}

	.blocks {
		padding-top: min(4rem, 5vh);
	}

	h1:first-of-type, p:first-of-type {
		text-align: center;
	}

	.hero-image {
		animation: scale-in 800ms var(--transition-easing);
	}

	.caption {
		opacity: .5; 
		font-size: .8em;
	}

	.avatar {
		position: relative;
		bottom: 0.2em;

		height: 1em;
		width: auto;
		border-radius: 999px;
		vertical-align: bottom;

		margin-right: .5ch;
	}

	.center {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		text-align: center; 
		padding: 2rem 0;
	}

	.no-padding {
		padding: 0;
	}

	footer {
		display: flex;
		gap: 1rem 2rem;
		justify-content: space-between;
		flex-wrap: wrap;

		font-size: 0.8em;
	}

	footer a {
		text-decoration: none !important;
	}

	.legal {
		display: flex;
		gap: 1rem;
	}
	
	.legal a {
		opacity: .5;
		transition: opacity var(--transition-s);
	}

	.legal a:hover {
		opacity: .75;
	}

	@keyframes scale-in {
		0% {
			transform: translateY(2rem) scale(.8);
			opacity: 0;
		}
		100% {
			transform: translateY(0)  scale(1);
			opacity: 1;
		}
	}
</style>
<script>
	if (localStorage.getItem('saw-home') !== 'true') {
		localStorage.setItem('saw-home', 'true')
	}	
</script>