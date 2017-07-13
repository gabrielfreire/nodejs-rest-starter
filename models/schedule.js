function Schedule(title, description, location, eventDate) {
    this.title = title || 'default';
    this.description = description || 'default';
    this.location = location || 'default';
    this.eventDate = eventDate || '0/0/0';
}

module.exports = Schedule;