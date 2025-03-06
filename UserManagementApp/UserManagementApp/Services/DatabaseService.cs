using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Data.Sqlite;
using EpicReads.Models;

namespace EpicReads.Services
{
    public static class DatabaseService
    {
        // Full path to the database file
        private static string DatabasePath => "/Users/janinduhemachandra/Documents/GitHub/GUI/BackEnd/users.db";

        // Connection string
        private static string ConnectionString => $"Data Source={DatabasePath};";

        // Verify the database file exists
        static DatabaseService()
        {
            if (!File.Exists(DatabasePath))
            {
                throw new FileNotFoundException("Database file not found", DatabasePath);
            }
        }

        // Get all users from the database
        public static List<User> GetAllUsers()
        {
            var users = new List<User>();

            try
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM users";

                using var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    users.Add(new User
                    {
                        Id = reader.GetInt32(0),
                        Username = reader.GetString(1),
                        Email = reader.GetString(2),
                        Password = reader.GetString(3),
                        CreatedAt = reader.GetDateTime(4)
                    });
                }
            }
            catch (Exception ex)
            {
                // Log the error or show a user-friendly message
                Console.WriteLine($"Error loading users: {ex.Message}");
            }

            return users;
        }

        // Add a new user to the database
        public static void AddUser(User user)
        {
            try
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = @"
                    INSERT INTO users (username, email, password)
                    VALUES ($username, $email, $password)";

                command.Parameters.AddWithValue("$username", user.Username);
                command.Parameters.AddWithValue("$email", user.Email);
                command.Parameters.AddWithValue("$password", user.Password);

                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // Log the error or show a user-friendly message
                Console.WriteLine($"Error adding user: {ex.Message}");
            }
        }

        public static void UpdateUser(User user)
        {
            // Ensure your connection string points to your database file.
            using (var connection = new SqliteConnection(ConnectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = @"
                UPDATE Users 
                SET Email = @Email, 
                    Password = @Password 
                WHERE Id = @Id";
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@Id", user.Id);
            
                    command.ExecuteNonQuery();
                }
            }
        }


        // Delete a user from the database
        public static void DeleteUser(int userId)
        {
            try
            {
                using var connection = new SqliteConnection(ConnectionString);
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = "DELETE FROM users WHERE id = $id";
                command.Parameters.AddWithValue("$id", userId);

                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                // Log the error or show a user-friendly message
                Console.WriteLine($"Error deleting user: {ex.Message}");
            }
        }
    }
}
// User model
