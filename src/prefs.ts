'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const MARGIN = 10;


const Gettext = imports.gettext;
const _ = Gettext.domain('gnome-clipboard').gettext;

export function init() {
    // Gtk.init(null);
}

export function buildPrefsWidget() {

    // Copy the same GSettings code from `extension.js`
    let settings = ExtensionUtils.getSettings(
        'org.gnome.shell.extensions.gnome-clipboard');

    let box = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        margin_top: 3 * MARGIN,
        margin_bottom: 3 * MARGIN,
        margin_start: 3 * MARGIN,
        margin_end: 3 * MARGIN,
        spacing: 3 * MARGIN,
        visible: true
     });

    let globalFrame = new Gtk.Frame({
        label: _("Preferences"),
        margin: 18,
        visible: true
     });

     box.add(globalFrame);

    // Create a parent widget that we'll return from this function
    let prefsWidget = new Gtk.Grid({
        margin: 18,
        column_spacing: 12,
        row_spacing: 12,
        visible: true
    });

    // Add a simple title and add it to the prefsWidget
    let title = new Gtk.Label({
        label: `<b>${Me.metadata.name} Preferences</b>`,
        halign: Gtk.Align.START,
        use_markup: true,
        visible: true
    });
    prefsWidget.attach(title, 0, 0, 2, 1);

    // Create a label & switch for `show-indicator`
    let toggleLabel = new Gtk.Label({
        label: 'Show Extension Indicator:',
        halign: Gtk.Align.START,
        visible: true
    });
    prefsWidget.attach(toggleLabel, 0, 1, 1, 1);

    let toggle = new Gtk.Switch({
        active: settings.get_boolean('show-indicator'),
        halign: Gtk.Align.END,
        visible: true
    });
    prefsWidget.attach(toggle, 1, 1, 1, 1);

    // Bind the switch to the `show-indicator` key
    settings.bind(
        'show-indicator',
        toggle,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    globalFrame.add(prefsWidget);

    let globalFrame2 = new Gtk.Frame({
        label: _("Preferences"),
        margin: 18,
        visible: true
     });

     box.add(globalFrame2);

    return box;
}