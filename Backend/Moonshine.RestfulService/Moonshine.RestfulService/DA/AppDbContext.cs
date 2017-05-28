using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Moonshine.RestfulService.DA.Entities;
using System;

namespace Moonshine.RestfulService.DA
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Survey> Survey { get; set; }
        public DbSet<Answers> Answer { get; set; }
        public DbSet<Questions> Question { get; set; }
        public DbSet<Results> Result { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(b =>
            {
                b.HasMany(u => u.Surveys)
                    .WithOne(t => t.User)
                    .HasForeignKey(t => t.UserId);
            });

            builder.Entity<Survey>(b =>
            {
                b.HasMany(u => u.Questions)
                        .WithOne(t => t.Survey)
                        .HasForeignKey(t => t.SurveyId);
            });

            builder.Entity<Questions>(b =>
            {
                b.HasMany(u => u.Results)
                        .WithOne(t => t.Question)
                        .HasForeignKey(t => t.QuestionId);
            });

            builder.Entity<Questions>(b =>
            {
                b.HasMany(u => u.Answers)
                        .WithOne(t => t.Question)
                        .HasForeignKey(t => t.QuestionId);
            });



        }
    }

}
