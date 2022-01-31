using Code_Challenge_Full_Stack.Controllers;
using Code_Challenge_Full_Stack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Web_API_Tests
{
    public class BoatsControllerTests
    {
        private BoatDBContext _dbContext;

        public BoatsControllerTests()
        {
            var options = new DbContextOptionsBuilder<BoatDBContext>()
                .UseInMemoryDatabase("BoatsDB", new InMemoryDatabaseRoot())
                .Options;
            _dbContext = new BoatDBContext(options);
            _dbContext.Database.EnsureCreated();

            if (_dbContext.Boats.Count() <= 0)
            {
                for (int i = 0; i < 10; i++)
                {
                    _dbContext.Boats.Add(new Boat
                    {
                        Name = "BoatName{i}",
                        Status = BoatStatus.Docked,
                        Notes = "Notes {i}"
                    });
                    _dbContext.SaveChanges();
                }
            }
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
        
        [Fact]
        public async Task GetAllBoatsTest()
        {
            var boatsController = new BoatsController(_dbContext);

            var boats = await boatsController.GetBoats();
            Assert.NotNull(boats.Value);
            Assert.Equal(10, boats.Value.Count());
        }

        [Fact]
        public async Task GetBoatTest()
        {
            var boatsController = new BoatsController(_dbContext);

            var boatResult = await boatsController.Get(5);
            Assert.NotNull(boatResult.Value);
            var boat = boatResult.Value;
            Assert.Equal(5, boat.Id);
        }

        [Fact]
        public async Task GetBoatTestNotFound()
        {
            var boatsController = new BoatsController(_dbContext);

            var boatResult = await boatsController.Get(99);
            Assert.IsType<NotFoundResult>(boatResult.Result);
        }

        [Fact]
        public async Task PostBoat()
        {
            var boatsController = new BoatsController(_dbContext);

            var boat = new Boat
            {
                Name = "TestBoat",
                Status = BoatStatus.InBound,
                Notes = "This is a test"
            };

            var boatResult = await boatsController.Post(boat);
            Assert.IsType<CreatedAtActionResult>(boatResult.Result);

            boatResult = await boatsController.Get(11);
            Assert.NotNull(boatResult.Value);
            boat = boatResult.Value;
            Assert.Equal(11, boat.Id);
        }

        [Fact]
        public async Task PostBoatValidationFailure()
        {
            var boatsController = new BoatsController(_dbContext);

            var boat = new Boat
            {
                Name = "TestBoat with a name that is far too long for validation",
                Status = BoatStatus.InBound,
                Notes = "This is a test"
            };

            // Manually trigger the validation logic
            var validationContext = new ValidationContext(boat, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(boat, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                boatsController.ModelState.AddModelError(validationResult.MemberNames.FirstOrDefault() ?? string.Empty, validationResult.ErrorMessage);
            }

            var boatResult = await boatsController.Post(boat);
            Assert.IsType<BadRequestResult>(boatResult.Result);
        }

        [Fact]
        public async Task PutTest()
        {
            var boatsController = new BoatsController(_dbContext);

            var boatResult = await boatsController.Get(1);
            Assert.NotNull(boatResult.Value);
            var boat = boatResult.Value;
            Assert.Equal(1, boat.Id);
            boat.Name = "Some new name";

            var putBoatResult = await boatsController.Put(1, boat);
            Assert.IsType<NoContentResult>(putBoatResult);
        }

        [Fact]
        public async Task PutTestWrongId()
        {
            var boatsController = new BoatsController(_dbContext);

            var boat = new Boat
            {
                Id = 1,
                Name = "TestBoat",
                Status = BoatStatus.InBound,
                Notes = "This is a test"
            };

            var boatResult = await boatsController.Put(3, boat);
            Assert.IsType<BadRequestResult>(boatResult);
        }

        [Fact]
        public async Task PutTestBadModel()
        {
            var boatsController = new BoatsController(_dbContext);

            var boat = new Boat
            {
                Id = 1,
                Name = "TestBoat with a really long name again",
                Status = BoatStatus.InBound,
                Notes = "This is a test"
            };

            // Manually trigger the validation logic
            var validationContext = new ValidationContext(boat, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(boat, validationContext, validationResults, true);
            foreach (var validationResult in validationResults)
            {
                boatsController.ModelState.AddModelError(validationResult.MemberNames.FirstOrDefault() ?? string.Empty, validationResult.ErrorMessage);
            }

            var boatResult = await boatsController.Put(1, boat);
            Assert.IsType<BadRequestResult>(boatResult);
        }

        [Fact]
        public async Task DeleteTest()
        {
            var boatsController = new BoatsController(_dbContext);
            var result = await boatsController.Delete(1);

            Assert.Equal(1, result.Value.Id);
        }

        [Fact]
        public async Task DeleteNotFound()
        {
            var boatsController = new BoatsController(_dbContext);

            var result = await boatsController.Delete(999);
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
