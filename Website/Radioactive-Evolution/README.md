@TODO

Bug / TODO list so far:

    Need to fix "All upgrades purchased" achievement

    Need to re-add Mousetrap to support keyboard control (or at least cheats)

    Refactor framerate code so that fish movements/speed are set in terms of seconds, rather than frames, so that their movement is framerate-agnostic. We can then set the framerate to higher/lower rates and the movement should be roughly the same speed. We can therefore dynamically alter the framerate depending on the speed of the browser.

    Add a delay of a few seconds when re-spawning fish so that the user has time to get away from the side of the screen.

    When fish swims into user, death message appears but death menu doesn't paint until mouse is moved. Interestingly, when a level ends the level menu displays automatically, so the logic is correct. I think lots of things happen when the event is fired so I need to clean up the order in which things respond to events.

    On first load, image background etc don't render.

    Need to remove capital letters from filenames.

    Only the last button in a menu has a cursor: pointer; hover state. The rest don't.

    Would be nice to bring back the loading screen.

    More config options would be good

    Better/more graceful fallback/degradation on Safari, IE etc