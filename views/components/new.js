<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Time Entry</title>
</head>
<body>
    <h1>Add New Time Entry</h1>
    <form action="/time" method="POST">
        <label for="date">Date:</label>
        <input type="date" id="date" name="date" required>
        <br>
        <label for="hours">Hours:</label>
        <input type="number" id="hours" name="hours" required><br>
        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea><br>
        <button type="submit">Add Entry</button>
    </form>
    <a href="/">Back to Home</a>
</body>
</html>
