function Schedule(id, title, description, location, eventDate) {
    this.id = id || 0;
    this.title = title || 'default';
    this.description = description || 'default';
    this.location = location || 'default';
    this.eventDate = eventDate || '0/0/0';
}

module.exports = Schedule;