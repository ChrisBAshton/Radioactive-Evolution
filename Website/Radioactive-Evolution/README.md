# Bugs

    Sometimes, the welcome page background isn't rendered properly (no image, just colors, etc). Happens on every 5-10 refreshes. Probably a RequireJS timing issue.

    When fish swims into user, death message appears but death menu doesn't paint until mouse is moved. Interestingly, when a level ends the level menu displays automatically, so the logic is correct. I think lots of things happen when the event is fired so I need to clean up the order in which things respond to events.

    Cheats are half-working. XP is being taken off when you cheat with flying fish, camouflage or growth, and user keeps spontaneously floating to surface when they apply growth upgrade (until they apply another cheat, or they move the user with keyboard controls! It DOESN'T get fixed if they reach the end of the level either - they keep floating in the next level!)

# Things we used to have, but now don't, and should re-add.

    Need to re-add Mousetrap to support keyboard control for the following cheats:
    * extra xp
    * skip level

    Help menu contents.

    Would be nice to bring back the loading screen.

    Would be nice to bring back "Time remaining:" in RED when <10 seconds left.    

# General Improvements

    Clean up the module structure. Remove MVC and categorise by super class type instead.

    Animate on requestAnimationFrame for efficiency.

    Use /module/view/canvas_factory

    Refactor framerate code so that fish movements/speed are set in terms of seconds, rather than frames, so that their movement is framerate-agnostic. We can then set the framerate to higher/lower rates and the movement should be roughly the same speed. We can therefore dynamically alter the framerate depending on the speed of the browser.

    Add a delay of a few seconds when re-spawning fish so that the user has time to get away from the side of the screen.

    Show current level on top menu.

    More config options would be good

    Better/more graceful fallback/degradation on Safari, IE etc