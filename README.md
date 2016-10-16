JUMBLE BEE
==========

About
------
Jumble bee is an application designed to help elementary school aged children practice for their spelling tests. The app was inspired by my seven year old niece. She wanted me to help her with learning to spell, but wanted it to be more fun, than just spelling words.

Features
--------
Jumble Bee allows the user to practice spelling by looking at a jumbled up word, and trying to unscramble it. These jumbled words can be created in one of three ways. The user can simply create a list, by entering words. A good example of this, would be if a teacher handed out a spelling list. The second way is to get a random list of words, based around a theme. For example, a user could enter winter sports, and be returned a random list of words releated to that theme. Finally, users can save these lists, and load them at anytime.

Technology
-----------
MongoDB
Angular
Node.JS
Express
Typo.js
  * Used to spellcheck the words the user enters, in the create view.
Retext.js
  * Used to limit the difficulty of the words returned on the randomly    
    generated lists. This is accomplished through counting syllables, and
    characters.
Auth0
  * Used to manage user logIn
  
