using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using EpicReads.Models;
using EpicReads.Services;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementApp.ViewModels
{
    public partial class MainWindowViewModel : ObservableObject
    {
        [ObservableProperty]
        private string _username = string.Empty;

        [ObservableProperty]
        private string _email = string.Empty;

        [ObservableProperty]
        private string _password = string.Empty;

        [ObservableProperty]
        private string _deleteUsername = string.Empty;

        [ObservableProperty]
        private bool _showAddFormField;

        [ObservableProperty]
        private bool _showDeleteFormField;

        [ObservableProperty]
        private string _statusMessage = string.Empty;

        [ObservableProperty]
        private bool _showStatusMessage;

        [ObservableProperty]
        private string _statusColor = "#3498db";
        
        [ObservableProperty]
        private string _updateUsername = string.Empty;
        [ObservableProperty]
        private bool _showUpdateFormField;
        [ObservableProperty]
        private bool _showUpdateDetails;

        public ObservableCollection<User> Users { get; } = new();

        public MainWindowViewModel()
        {
            LoadUsers();
        }

        [RelayCommand]
        private async Task AddUser()
        {
            if (string.IsNullOrWhiteSpace(Username) || 
                string.IsNullOrWhiteSpace(Email) || 
                string.IsNullOrWhiteSpace(Password))
            {
                ShowStatus("All fields are required!", "#e74c3c");
                return;
            }

            var existingUser = Users.FirstOrDefault(u => 
                u.Username.Equals(Username.Trim(), System.StringComparison.OrdinalIgnoreCase));

            if (existingUser != null)
            {
                ShowStatus("Username already exists!", "#e74c3c");
                return;
            }

            try
            {
                var newUser = new User
                {
                    Username = Username.Trim(),
                    Email = Email.Trim(),
                    Password = Password,
                    CreatedAt = System.DateTime.Now
                };

                DatabaseService.AddUser(newUser);
                Users.Insert(0, newUser);
                ClearForm();
                ShowAddFormField = false;
                ShowStatus("User added successfully!", "#2ecc71");
                LoadUsers();
            }
            catch (System.Exception ex)
            {
                ShowStatus($"Error: {ex.Message}", "#e74c3c");
            }
        }

        [RelayCommand]
        private void DeleteUser()
        {
            if (string.IsNullOrWhiteSpace(DeleteUsername))
            {
                ShowStatus("Please enter a username!", "#e74c3c");
                return;
            }

            var userToDelete = Users.FirstOrDefault(u => 
                u.Username.Equals(DeleteUsername.Trim(), System.StringComparison.OrdinalIgnoreCase));

            if (userToDelete == null)
            {
                ShowStatus("User not found!", "#e74c3c");
                return;
            }

            try
            {
                DatabaseService.DeleteUser(userToDelete.Id);
                Users.Remove(userToDelete);
                DeleteUsername = string.Empty;
                ShowDeleteFormField = false;
                ShowStatus("User deleted successfully!", "#2ecc71");
                LoadUsers();
            }
            catch (System.Exception ex)
            {
                ShowStatus($"Error: {ex.Message}", "#e74c3c");
            }
        }
        [RelayCommand]
        private void ShowUpdateForm()
        {
            ShowUpdateFormField = true;
            ShowUpdateDetails = false;
            UpdateUsername = string.Empty;
            // Clear any previous email/password values:
            Email = string.Empty;
            Password = string.Empty;
        }

        // New command to hide/cancel update:
        [RelayCommand]
        private void HideUpdateForm()
        {
            ShowUpdateFormField = false;
            ShowUpdateDetails = false;
            UpdateUsername = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
        }

        // New command to load the user for updating:
        [RelayCommand]
        private void LoadUserForUpdate()
        {
            if (string.IsNullOrWhiteSpace(UpdateUsername))
            {
                ShowStatus("Please enter a username!", "#e74c3c");
                return;
            }

            var userToUpdate = Users.FirstOrDefault(u =>
                u.Username.Equals(UpdateUsername.Trim(), System.StringComparison.OrdinalIgnoreCase));

            if (userToUpdate == null)
            {
                ShowStatus("User not found!", "#e74c3c");
                return;
            }

            // Populate the Email and Password fields with the current values.
            Email = userToUpdate.Email;
            Password = userToUpdate.Password;
            ShowUpdateDetails = true;
        }

        // New command to confirm and update the user.
        [RelayCommand]
        private async Task ConfirmUpdateUser()
        {
            if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password))
            {
                ShowStatus("Email and Password are required!", "#e74c3c");
                return;
            }

            var userToUpdate = Users.FirstOrDefault(u =>
                u.Username.Equals(UpdateUsername.Trim(), System.StringComparison.OrdinalIgnoreCase));

            if (userToUpdate == null)
            {
                ShowStatus("User not found!", "#e74c3c");
                return;
            }

            try
            {
                userToUpdate.Email = Email.Trim();
                userToUpdate.Password = Password;
                DatabaseService.UpdateUser(userToUpdate);

                ShowStatus("User updated successfully!", "#2ecc71");
                LoadUsers();
                // Optionally, you could refresh Users collection if needed.

                // Hide update form and clear fields:
                ShowUpdateFormField = false;
                ShowUpdateDetails = false;
                UpdateUsername = string.Empty;
                Email = string.Empty;
                Password = string.Empty;
            }
            catch (System.Exception ex)
            {
                ShowStatus($"Error: {ex.Message}", "#e74c3c");
            }
        }
       


        [RelayCommand]
        private void ShowAddForm() => ShowAddFormField = true;

        [RelayCommand]
        private void HideAddForm()
        {
            ShowAddFormField = false;
            ClearForm();
        }

        [RelayCommand]
        private void ShowDeleteForm() => ShowDeleteFormField = true;

        [RelayCommand]
        private void HideDeleteForm()
        {
            ShowDeleteFormField = false;
            DeleteUsername = string.Empty;
        }

        private void LoadUsers()
        {
            Users.Clear();
            var users = DatabaseService.GetAllUsers()
                .OrderByDescending(u => u.CreatedAt);
    
            foreach (var user in users)
            {
                Console.WriteLine($"User: {user.Username}, {user.Email}, {user.CreatedAt}");
                Users.Add(user);
            }
        }


        private void ClearForm()
        {
            Username = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
        }

        private async void ShowStatus(string message, string color)
        {
            StatusMessage = message;
            StatusColor = color;
            ShowStatusMessage = true;
            await Task.Delay(3000);
            ShowStatusMessage = false;
        }
    }
    
}