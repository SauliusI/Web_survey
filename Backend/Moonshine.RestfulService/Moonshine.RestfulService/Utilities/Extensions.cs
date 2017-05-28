using System;
using System.Collections.Generic;

namespace Moonshine.RestfulService.Utilities
{
    public static class Extensions
    {
        public static void ForEach<T>(this IEnumerable<T> collection, Action<T> action)
        {
            foreach (var item in collection)
                action(item);
        }
    }
}
