Dark Souls Character Builder
=====================================

[ UPDATE ]v0.42d
-----------------------------------
* Implement Bleed Resistance Conversion

[ Previous Updates ]
-----------------------------------
- v0.41d
 * New Endurance Conversions (stamina & equip load)
 * Clamp values at max 99

- v0.4d
 * Added profile sharing, as well as a huge list of small bug fixes

- v0.31d
 * Added A slew of hotkeys to the builder (These are relative to stats)
 * UP: Increment Stat by +1
 * DOWN: Decrement Stat by -1
 * SHIFT+UP: Increment Stat by +10
 * SHIFT+DOWN: Decrement Stat by -10
 * SHIFT+Click on Plus or Minus: +10 or -10 to stat
- v0.3d
 * New layout, to reflect the in-game display
 * Added HP Conversion (this is the first of many conversions in this major update)

- v0.21d
 * Manual Stat entry
 * "Starting Cost" for souls is redundant, should be remove
 * Basic Art: just to make it not so atrocious.
 * New Layout: more understandable

- v0.2d
 * Basic Art: just to make it not so atrocious.
 * New Layout: more understandable

### BACKLOG
* ~~Clamp values at max 99~~
* Reset stats button
* ~~Display Attunement -> Spell Slots conversion : http://darksouls.wikidot.com/attunement~~
- Display Endurance conversions : http://darksouls.wikidot.com/endurance
 * ~~Endurance -> Equip Burden~~
 * ~~Endurance -> Stamina~~
 * ~~Endurance -> Bleed Resistance~~
 * Endurance -> Roll Speed
* ~~Display Vitality -> HP conversion : http://darksouls.wikidot.com/vitality~~
* Display Resistance -> Resistances conversion : http://darksouls.wikidot.com/resistance
* Display Humanity conversions : http://darksouls.wikidot.com/humanity
 * Humanity -> Item Discovery Rate
 * Humanity -> Curse Resist
* ~~Profile Saving~~
* ~~Profile Sharing~~
* ~~Manual Stat entry~~
* ~~"Starting Cost" for souls is redundant, should be removed~~
* ~~Calculate Soul costs based on stats~~
* ~~Calculate Soul Level based on stats~~
* ~~Add & Subtract Stats~~


### Wishlist
* Weapon Calculator
* Armor Calculator
* Manual Soul Level entry, to allow locked stat allocation.


### BUGS
- ~~Input fields do not reset to white when switching classes~~
* ~~Too many stats returns NaN in Total Cost... need to build the formula for stat calculation~~

### Bootstrapping Guide

    gem install bundler
    bundle install
    ln -nfs database.example.yml config/database.yml
    bundle exec rake db:create:all
    bundle exec rake db:migrate

